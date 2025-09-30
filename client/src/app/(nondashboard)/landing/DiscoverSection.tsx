"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const DiscoverSection = () => {
  return (
    // DESIGN CHANGE: Modern background with subtle pattern
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="relative py-20 sm:py-28 bg-gray-900 overflow-hidden"
    >
      {/* DESIGN CHANGE: Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* DESIGN CHANGE: Gradient orbs for depth */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* DESIGN CHANGE: Modern section header with contrasting colors */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            How It Works
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Your Journey to
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Home Sweet Home
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Finding your dream rental has never been easier. Follow these simple
            steps and move into your perfect home in no time.
          </p>
        </motion.div>

        {/* DESIGN CHANGE: Modern process cards with connection lines */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Connection line for desktop */}
          <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

          {[
            {
              imageSrc: "/landing-icon-wand.png",
              title: "Search Properties",
              description:
                "Browse our curated collection of verified rental properties in your dream location with advanced filters.",
              number: "01",
              color: "from-blue-500 to-cyan-500",
            },
            {
              imageSrc: "/landing-icon-calendar.png",
              title: "Book Instantly",
              description:
                "Found the perfect place? Secure your rental with our streamlined booking process in just a few clicks.",
              number: "02",
              color: "from-purple-500 to-pink-500",
            },
            {
              imageSrc: "/landing-icon-heart.png",
              title: "Move In & Enjoy",
              description:
                "Complete the process smoothly and start enjoying your new home. We're here to support you every step.",
              number: "03",
              color: "from-pink-500 to-rose-500",
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              <DiscoverCard {...card} index={index} />
            </motion.div>
          ))}
        </div>

        {/* DESIGN CHANGE: Stats section for credibility */}
        <motion.div
          variants={itemVariants}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          {[
            { value: "2.5M+", label: "Happy Tenants" },
            { value: "50K+", label: "Properties" },
            { value: "15min", label: "Avg. Response" },
            { value: "98%", label: "Satisfaction" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

const DiscoverCard = ({
  imageSrc,
  title,
  description,
  number,
  color,
  index,
}: {
  imageSrc: string;
  title: string;
  description: string;
  number: string;
  color: string;
  index: number;
}) => (
  // DESIGN CHANGE: Glassmorphism cards with modern styling
  <div className="group relative h-full">
    {/* Number badge */}
    <div className="absolute -top-4 left-8 z-20">
      <div
        className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}
      >
        {number}
      </div>
    </div>

    {/* Card */}
    <div className="relative h-full p-8 pt-12 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 group-hover:transform group-hover:scale-[1.02]">
      {/* Icon container */}
      <div className="mb-6 flex justify-center">
        <div
          className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${color} p-4 shadow-xl group-hover:shadow-2xl transition-shadow duration-500`}
        >
          <Image
            src={imageSrc}
            width={80}
            height={80}
            className="w-full h-full object-contain"
            alt={title}
          />
          {/* Glow effect */}
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${color} blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500`}
          ></div>
        </div>
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold text-white mb-3 text-center group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
        {title}
      </h3>
      <p className="text-gray-300 leading-relaxed text-center">{description}</p>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/40 transition-all duration-500"></div>
    </div>

    {/* Arrow connector for mobile */}
    {index < 2 && (
      <div className="md:hidden flex justify-center my-4">
        <svg
          className="w-8 h-8 text-purple-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    )}
  </div>
);

export default DiscoverSection;
