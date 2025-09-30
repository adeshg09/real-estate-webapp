"use client";

import React from "react";
import { easeOut, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const FeaturesSection = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="py-20 sm:py-28 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Features
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Your Search,
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Simplified
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful tools and verified listings to help you find your perfect
            home with confidence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              imageSrc: `/landing-search3.png`,
              title: "Verified Listings",
              description:
                "Every property is verified and backed by real reviews from trusted renters in our community.",
              linkText: "Explore",
              linkHref: "/explore",
              icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
            },
            {
              imageSrc: `/landing-search2.png`,
              title: "Smart Search",
              description:
                "Advanced filters and AI-powered recommendations to find exactly what you're looking for.",
              linkText: "Search",
              linkHref: "/search",
              icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
            },
            {
              imageSrc: `/landing-search1.png`,
              title: "Instant Booking",
              description:
                "Seamless booking experience with real-time availability and instant confirmation.",
              linkText: "Discover",
              linkHref: "/discover",
              icon: "M13 10V3L4 14h7v7l9-11h-7z",
            },
          ].map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const FeatureCard = ({
  imageSrc,
  title,
  description,
  linkText,
  linkHref,
  icon,
}: {
  imageSrc: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  icon: string;
}) => (
  <div className="group relative h-full">
    <div className="relative h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/50 group-hover:to-purple-50/50 transition-all duration-500 rounded-2xl"></div>

      {/* Content */}
      <div className="relative p-8">
        {/* Icon */}
        <div className="mb-6 inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={icon}
            />
          </svg>
        </div>

        {/* Image */}
        <div className="mb-6 rounded-xl overflow-hidden bg-gray-50 h-48 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500">
          <Image
            src={imageSrc}
            width={400}
            height={400}
            className="w-full h-full object-contain p-4"
            alt={title}
          />
        </div>

        {/* Text */}
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

        {/* CTA Link */}
        <Link
          href={linkHref}
          className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all duration-300 group/link"
          scroll={false}
        >
          {linkText}
          <svg
            className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  </div>
);

export default FeaturesSection;
