"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setFilters } from "@/state";

const HeroSection = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleLocationSearch = async () => {
    try {
      const trimmedQuery = searchQuery.trim();
      if (!trimmedQuery) return;

      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          trimmedQuery
        )}.json?access_token=${
          process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
        }&fuzzyMatch=true`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const bestMatch = data.features[0];
        const [lng, lat] = bestMatch.center;
        const placeType = bestMatch.place_type[0];

        let zoomLevel;
        switch (placeType) {
          case "neighborhood":
            zoomLevel = 14;
            break;
          case "locality":
            zoomLevel = 12;
            break;
          case "place":
            zoomLevel = 10;
            break;
          default:
            zoomLevel = 12;
        }

        dispatch(
          setFilters({
            location: trimmedQuery,
            coordinates: [lng, lat],
            zoomLevel,
          })
        );

        const params = new URLSearchParams({
          location: trimmedQuery,
          lat: lat.toString(),
          lng: lng.toString(),
        });
        router.push(`/search?${params.toString()}`);
      }
    } catch (error) {
      console.error("Error searching location:", error);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <Image
        src="/landing-splash.jpg"
        alt="Rentiful Rental Platform Hero Section"
        fill
        className="object-cover object-center scale-105"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent"></div>

      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-purple-600/20"></div>

      {/* Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-full px-6 sm:px-8 lg:px-12"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-white text-sm font-medium">
                Trusted by 10,000+ renters
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 text-center leading-tight"
          >
            Find Your Perfect
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Home Today
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg sm:text-xl text-gray-200 mb-10 text-center max-w-2xl mx-auto leading-relaxed"
          >
            Discover premium rental properties tailored to your lifestyle. Start
            your journey to finding a place you&apos;ll love to call home.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative p-2 rounded-2xl bg-white/95 backdrop-blur-lg shadow-2xl">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleLocationSearch()
                    }
                    placeholder="Enter city, neighborhood, or address..."
                    className="pl-12 pr-4 h-14 border-none bg-transparent text-gray-900 placeholder:text-gray-500 focus-visible:ring-0 text-base"
                  />
                </div>
                <Button
                  onClick={handleLocationSearch}
                  className="h-14 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Search
                </Button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="text-sm text-gray-300">Popular:</span>
              {["Mumbai", "Delhi", "Bangalore", "Pune"].map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    setSearchQuery(city);
                  }}
                  className="px-3 py-1 text-sm text-white bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-200"
                >
                  {city}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-16 flex flex-wrap justify-center items-center gap-8 sm:gap-12"
          >
            {[
              { number: "50K+", label: "Properties" },
              { number: "100+", label: "Cities" },
              { number: "4.8★", label: "Rating" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1, duration: 0.5 },
          y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white rounded-full"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
