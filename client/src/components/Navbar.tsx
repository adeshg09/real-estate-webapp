"use client";

import { NAVBAR_HEIGHT } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "aws-amplify/auth";
import { Bell, MessageCircle, Plus, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();

  const isDashboardPage =
    pathname.includes("/managers") || pathname.includes("/tenants");

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    // DESIGN CHANGE: Modern navbar with glassmorphism and gradient
    <div
      className="fixed top-0 left-0 w-full z-50"
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      {/* DESIGN CHANGE: Glassmorphism background with backdrop blur */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-md border-b border-white/10"></div>

      {/* DESIGN CHANGE: Subtle gradient accent overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/5 to-blue-600/10"></div>

      <div className="relative flex justify-between items-center w-full h-full py-3 px-6 sm:px-8">
        {/* Left Section - Logo & Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          {isDashboardPage && (
            <div className="md:hidden">
              {/* DESIGN CHANGE: Modern sidebar trigger with hover effect */}
              <div className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200">
                <SidebarTrigger />
              </div>
            </div>
          )}

          {/* DESIGN CHANGE: Enhanced logo with gradient text */}
          <Link
            href="/"
            className="group cursor-pointer flex items-center gap-3"
            scroll={false}
          >
            <div className="relative">
              {/* Glow effect on logo */}
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Image
                src="/logo.svg"
                alt="Rentiful Logo"
                width={28}
                height={28}
                className="w-7 h-7 relative z-10 group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="text-xl font-bold">
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                RENT
              </span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-light group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                IFUL
              </span>
            </div>
          </Link>

          {/* DESIGN CHANGE: Modern action button with gradient */}
          {isDashboardPage && authUser && (
            <Button
              variant="secondary"
              className="md:ml-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-lg"
              onClick={() =>
                router.push(
                  authUser.userRole?.toLowerCase() === "manager"
                    ? "/managers/newproperty"
                    : "/search"
                )
              }
            >
              {authUser.userRole?.toLowerCase() === "manager" ? (
                <>
                  <Plus className="h-4 w-4" />
                  <span className="hidden md:block ml-2">Add Property</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span className="hidden md:block ml-2">Search</span>
                </>
              )}
            </Button>
          )}
        </div>

        {/* Center Section - Tagline */}
        {!isDashboardPage && (
          <p className="text-gray-300 hidden lg:block text-sm font-medium">
            <span className="text-blue-400">Discover</span> your perfect rental
            with advanced search
          </p>
        )}

        {/* Right Section - User Actions */}
        <div className="flex items-center gap-4 md:gap-5">
          {authUser ? (
            <>
              {/* DESIGN CHANGE: Modern notification icons with badge */}
              <div className="hidden md:flex items-center gap-4">
                <button className="relative p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 group">
                  <MessageCircle className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors duration-200" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full ring-2 ring-gray-900"></span>
                </button>

                <button className="relative p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 group">
                  <Bell className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors duration-200" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full ring-2 ring-gray-900"></span>
                </button>
              </div>

              {/* DESIGN CHANGE: Modern user dropdown with glassmorphism */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none group">
                  <div className="relative">
                    {/* Avatar glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <Avatar className="relative ring-2 ring-white/20 group-hover:ring-blue-400/50 transition-all duration-300">
                      <AvatarImage src={authUser.userInfo?.image} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold">
                        {authUser.userRole?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="hidden md:flex flex-col items-start">
                    <p className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors duration-200">
                      {authUser.userInfo?.name}
                    </p>
                    <p className="text-gray-400 text-xs capitalize">
                      {authUser.userRole?.toLowerCase()}
                    </p>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-all duration-200 group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </DropdownMenuTrigger>

                {/* DESIGN CHANGE: Modern dropdown with glassmorphism */}
                <DropdownMenuContent className="bg-gray-900/95 backdrop-blur-lg border border-white/10 text-white shadow-2xl rounded-xl p-2 min-w-[200px]">
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 font-semibold rounded-lg mb-1 transition-all duration-200"
                    onClick={() =>
                      router.push(
                        authUser.userRole?.toLowerCase() === "manager"
                          ? "/managers/properties"
                          : "/tenants/favorites",
                        { scroll: false }
                      )
                    }
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                    Dashboard
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-white/10 my-2" />

                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-white/10 rounded-lg mb-1 transition-all duration-200"
                    onClick={() =>
                      router.push(
                        `/${authUser.userRole?.toLowerCase()}s/settings`,
                        { scroll: false }
                      )
                    }
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Settings
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-red-600/20 text-red-400 hover:text-red-300 rounded-lg transition-all duration-200"
                    onClick={handleSignOut}
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            // DESIGN CHANGE: Modern auth buttons with gradient
            <div className="flex items-center gap-3">
              <Link href="/signin">
                <Button
                  variant="outline"
                  className="text-white border border-white/20 bg-white/5 hover:bg-white hover:text-gray-900 rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="secondary"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* DESIGN CHANGE: Bottom gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
    </div>
  );
};

export default Navbar;
