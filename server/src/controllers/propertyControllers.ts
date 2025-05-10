import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { wktToGeoJSON } from "@terraformer/wkt";
import { S3Client } from "@aws-sdk/client-s3";
import { Location } from "@prisma/client";
import { Upload } from "@aws-sdk/lib-storage";
import axios from "axios";

const prisma = new PrismaClient();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const getProperties = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      favoriteIds,
      priceMin,
      priceMax,
      beds,
      baths,
      propertyType,
      squareFeetMin,
      squareFeetMax,
      amenities,
      availableFrom,
      latitude,
      longitude,
      location,
    } = req.query;
    console.log("req.query", req.query);

    let whereConditions: Prisma.Sql[] = [];

    if (favoriteIds) {
      const favoriteIdsArray = (favoriteIds as string).split(",").map(Number);
      whereConditions.push(
        Prisma.sql`p.id IN (${Prisma.join(favoriteIdsArray)})`
      );
    }

    if (priceMin) {
      whereConditions.push(
        Prisma.sql`p."pricePerMonth" >= ${Number(priceMin)}`
      );
    }

    if (priceMax) {
      whereConditions.push(
        Prisma.sql`p."pricePerMonth" <= ${Number(priceMax)}`
      );
    }

    if (beds && beds !== "any") {
      whereConditions.push(Prisma.sql`p.beds >= ${Number(beds)}`);
    }

    if (baths && baths !== "any") {
      whereConditions.push(Prisma.sql`p.baths >= ${Number(baths)}`);
    }

    if (squareFeetMin) {
      whereConditions.push(
        Prisma.sql`p."squareFeet" >= ${Number(squareFeetMin)}`
      );
    }

    if (squareFeetMax) {
      whereConditions.push(
        Prisma.sql`p."squareFeet" <= ${Number(squareFeetMax)}`
      );
    }

    if (propertyType && propertyType !== "any") {
      whereConditions.push(
        Prisma.sql`p."propertyType" = ${propertyType}::"PropertyType"`
      );
    }

    if (amenities && amenities !== "any") {
      const amenitiesArray = (amenities as string).split(",");
      whereConditions.push(Prisma.sql`p.amenities @> ${amenitiesArray}`);
    }

    if (availableFrom && availableFrom !== "any") {
      const availableFromDate =
        typeof availableFrom === "string" ? availableFrom : null;
      if (availableFromDate) {
        const date = new Date(availableFromDate);
        if (!isNaN(date.getTime())) {
          whereConditions.push(
            Prisma.sql`EXISTS (
              SELECT 1 FROM "Lease" l 
              WHERE l."propertyId" = p.id 
              AND l."startDate" <= ${date.toISOString()}
            )`
          );
        }
      }
    }

    if (latitude && longitude) {
      const lat = parseFloat(latitude as string);
      const lng = parseFloat(longitude as string);
      // const radiusInKilometers = 1000;
      // const degrees = radiusInKilometers / 111; // Converts kilometers to degrees
      const radiusInMeters = 50 * 1000; // covers regions within 50km

      whereConditions.push(
        Prisma.sql`ST_DWithin(
          l.coordinates::geography,
          ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326),
          ${radiusInMeters}
        )`
      );
    }

    const completeQuery = Prisma.sql`
      SELECT 
        p.*,
        json_build_object(
          'id', l.id,
          'address', l.address,
          'city', l.city,
          'state', l.state,
          'country', l.country,
          'postalCode', l."postalCode",
          'coordinates', json_build_object(
            'longitude', ST_X(l."coordinates"::geometry),
            'latitude', ST_Y(l."coordinates"::geometry)
          )
        ) as location
      FROM "Property" p
      JOIN "Location" l ON p."locationId" = l.id
      ${
        whereConditions.length > 0
          ? Prisma.sql`WHERE ${Prisma.join(whereConditions, " AND ")}`
          : Prisma.empty
      }
    `;

    const properties = await prisma.$queryRaw(completeQuery);
    console.log("properties", properties);

    res.json(properties);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving properties: ${error.message}` });
  }
};

export const getProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const property = await prisma.property.findUnique({
      where: { id: Number(id) },
      include: {
        location: true,
      },
    });
    console.log("property", property);

    if (property) {
      const coordinates: { coordinates: string }[] =
        await prisma.$queryRaw`SELECT ST_asText(coordinates) as coordinates from "Location" where id = ${property.location.id}`;

      const geoJSON: any = wktToGeoJSON(coordinates[0]?.coordinates || "");
      const longitude = geoJSON.coordinates[0];
      const latitude = geoJSON.coordinates[1];

      const propertyWithCoordinates = {
        ...property,
        location: {
          ...property.location,
          coordinates: {
            longitude,
            latitude,
          },
        },
      };
      res.json(propertyWithCoordinates);
    }
  } catch (err: any) {
    res
      .status(500)
      .json({ message: `Error retrieving property: ${err.message}` });
  }
};

export const createProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[];
    console.log("files are", files);

    const {
      address,
      city,
      state,
      country,
      postalCode,
      managerCognitoId,
      ...propertyData
    } = req.body;

    // 1. Upload photos to S3
    const photoUrls = await Promise.all(
      files.map(async (file) => {
        const uploadParams = {
          Bucket: process.env.S3_BUCKET_NAME!,
          Key: `properties/${Date.now()}-${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        };

        const uploadResult = await new Upload({
          client: s3Client,
          params: uploadParams,
        }).done();

        return uploadResult.Location;
      })
    );

    // 2. Geocoding with Google Maps API (with fallback to Nominatim)
    let longitude = 0;
    let latitude = 0;

    try {
      // First try Google Geocoding API
      const googleResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          `${address}, ${city}, ${state}, ${postalCode}, ${country}`
        )}&key=${process.env.GOOGLE_MAPS_API_KEY}`
      );
      console.log("googleResponse", googleResponse);

      if (googleResponse.data.results[0]) {
        longitude = googleResponse.data.results[0].geometry.location.lng;
        latitude = googleResponse.data.results[0].geometry.location.lat;
      } else {
        // Fallback to Nominatim if Google fails
        const nominatimResponse = await axios.get(
          `https://nominatim.openstreetmap.org/search?${new URLSearchParams({
            street: address,
            city,
            country,
            postalcode: postalCode,
            format: "json",
            limit: "1",
          }).toString()}`,
          {
            headers: {
              "User-Agent": "RealEstateApp (adeshgadage0908@gmail.com)",
            },
          }
        );
        console.log("nominatimResponse", nominatimResponse);

        if (nominatimResponse.data[0]) {
          longitude = parseFloat(nominatimResponse.data[0].lon);
          latitude = parseFloat(nominatimResponse.data[0].lat);
        }
      }
    } catch (geocodeError) {
      console.error("Geocoding error:", geocodeError);
      // Continue with (0,0) if both services fail
    }
    console.log("latitude", latitude);
    console.log("longitude", longitude);

    // 3. Create location in database
    const [location] = await prisma.$queryRaw<Location[]>`
      INSERT INTO "Location" 
        (address, city, state, country, "postalCode", coordinates)
      VALUES 
        (${address}, ${city}, ${state}, ${country}, ${postalCode}, 
         ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326))
      RETURNING 
        id, address, city, state, country, "postalCode", 
        ST_X(coordinates::geometry) as longitude,
        ST_Y(coordinates::geometry) as latitude;
    `;

    // 4. Create property with parsed data
    const newProperty = await prisma.property.create({
      data: {
        ...propertyData,
        photoUrls,
        locationId: location.id,
        managerCognitoId,
        amenities: Array.isArray(propertyData.amenities)
          ? propertyData.amenities
          : propertyData.amenities?.split(",") || [],
        highlights: Array.isArray(propertyData.highlights)
          ? propertyData.highlights
          : propertyData.highlights?.split(",") || [],
        isPetsAllowed: propertyData.isPetsAllowed === "true",
        isParkingIncluded: propertyData.isParkingIncluded === "true",
        pricePerMonth: parseFloat(propertyData.pricePerMonth),
        securityDeposit: parseFloat(propertyData.securityDeposit),
        applicationFee: parseFloat(propertyData.applicationFee),
        beds: parseInt(propertyData.beds),
        baths: parseFloat(propertyData.baths),
        squareFeet: parseInt(propertyData.squareFeet),
      },
      include: {
        location: true,
        manager: true,
      },
    });

    res.status(201).json({
      ...newProperty,
    });
  } catch (err: any) {
    console.error("Error creating property:", err);
    res.status(500).json({
      message: "Error creating property",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};
export const getPropertyLeases = async (req: Request, res: Response) => {
  try {
    const leases = await prisma.lease.findMany({
      where: { propertyId: Number(req.params.id) },
      include: { tenant: true },
    });
    res.json(leases);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch property leases" });
  }
};
