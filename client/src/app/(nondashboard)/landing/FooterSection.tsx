import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const FooterSection = () => {
  return (
    // DESIGN CHANGE: Modern footer with gradient background
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-gray-300">
      {/* DESIGN CHANGE: Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4" scroll={false}>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                RENTIFUL
              </div>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted partner in finding the perfect rental home. Making
              dreams come true, one property at a time.
            </p>

            {/* DESIGN CHANGE: Social icons with modern styling */}
            <div className="flex gap-3">
              {[
                { icon: faFacebook, label: "Facebook", href: "#" },
                { icon: faInstagram, label: "Instagram", href: "#" },
                { icon: faTwitter, label: "Twitter", href: "#" },
                { icon: faLinkedin, label: "LinkedIn", href: "#" },
                { icon: faYoutube, label: "YouTube", href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/10 hover:border-transparent group"
                >
                  <FontAwesomeIcon
                    icon={social.icon}
                    className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-300"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "How It Works", href: "/how-it-works" },
                { label: "Browse Properties", href: "/search" },
                { label: "List Property", href: "/list" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-300 group"
                  >
                    <svg
                      className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              {[
                { label: "Contact Us", href: "/contact" },
                { label: "FAQ", href: "/faq" },
                { label: "Help Center", href: "/help" },
                { label: "Trust & Safety", href: "/safety" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-300 group"
                  >
                    <svg
                      className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-400 mb-4 text-sm">
              Subscribe to get the latest properties and exclusive offers.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <button className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} RENTiful. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Cookie Policy", href: "/cookies" },
              ].map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
