"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const CallToActionSection = () => {
  return (
    // DESIGN CHANGE: Modern CTA with improved layout and interactivity
    <div className="relative py-32 overflow-hidden">
      {/* Background Image with parallax effect */}
      <Image
        src="/landing-call-to-action.jpg"
        alt="Rentiful Search Section Background"
        fill
        className="object-cover object-center scale-110"
      />

      {/* DESIGN CHANGE: Modern gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-transparent"></div>

      {/* DESIGN CHANGE: Animated gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 mix-blend-overlay"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* DESIGN CHANGE: Badge for urgency */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Limited Time Offer
            </motion.div>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Find Your
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Dream Home?
              </span>
            </h2>

            <p className="text-lg text-gray-200 mb-8 leading-relaxed">
              Join thousands of happy renters who found their perfect home
              through our platform. Start your search today and unlock exclusive
              deals.
            </p>

            {/* DESIGN CHANGE: Feature list with icons */}
            <div className="space-y-4 mb-8">
              {[
                { icon: "M5 13l4 4L19 7", text: "Verified listings only" },
                {
                  icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                  text: "Instant booking available",
                },
                {
                  icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                  text: "24/7 customer support",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={item.icon}
                      />
                    </svg>
                  </div>
                  <span className="text-gray-200">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* DESIGN CHANGE: Modern CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group relative px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors duration-300">
                  <svg
                    className="w-5 h-5"
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
                  Start Searching
                </span>
              </button>

              <Link
                href="/signup"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex items-center justify-center gap-2"
                scroll={false}
              >
                Sign Up Free
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Right Content - Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="hidden md:block"
          >
            <div className="relative p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
              {/* Decorative gradient */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl opacity-60"></div>

              <div className="relative space-y-6">
                <div className="text-center pb-6 border-b border-white/20">
                  <div className="text-5xl font-bold text-white mb-2">
                    50,000+
                  </div>
                  <div className="text-gray-300">Active Listings</div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "4.9/5", label: "User Rating" },
                    { value: "100+", label: "Cities" },
                    { value: "24/7", label: "Support" },
                    { value: "2M+", label: "Happy Users" },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-300">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Trust badges */}
                <div className="pt-6 border-t border-white/20">
                  <div className="text-sm text-gray-300 text-center mb-3">
                    Trusted by
                  </div>
                  <div className="flex justify-center gap-4 opacity-60">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center"
                      >
                        <span className="text-white font-bold text-xs">
                          LOGO
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* DESIGN CHANGE: Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
    </div>
  );
};

export default CallToActionSection;
