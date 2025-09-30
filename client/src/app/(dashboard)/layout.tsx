"use client";

import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/AppSidebar";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import React, { useEffect, useState } from "react";
import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      const userRole = authUser.userRole?.toLowerCase();
      if (
        (userRole === "manager" && pathname.startsWith("/tenants")) ||
        (userRole === "tenant" && pathname.startsWith("/managers"))
      ) {
        router.push(
          userRole === "manager"
            ? "/managers/properties"
            : "/tenants/favorites",
          { scroll: false }
        );
      } else {
        setIsLoading(false);
      }
    }
  }, [authUser, router, pathname]);

  if (authLoading || isLoading) return <Loading />;
  if (!authUser?.userRole) return null;

  return (
    <SidebarProvider>
      {/* DESIGN CHANGE: Light, airy background matching landing page */}
      <div className="min-h-screen w-full bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 relative overflow-hidden">
        {/* DESIGN CHANGE: Subtle dot pattern like landing page */}
        <div className="fixed inset-0 opacity-[0.015] pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
              backgroundSize: "48px 48px",
            }}
          ></div>
        </div>

        {/* DESIGN CHANGE: Soft gradient orbs matching landing page */}
        <div className="fixed top-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="fixed bottom-20 left-20 w-[500px] h-[500px] bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl pointer-events-none"></div>

        <Navbar />

        <div style={{ marginTop: `${NAVBAR_HEIGHT}px` }}>
          <main className="flex relative z-10">
            <Sidebar userType={authUser.userRole.toLowerCase()} />

            {/* DESIGN CHANGE: Clean content area with subtle shadow */}
            <div className="flex-grow transition-all duration-300">
              <div className="min-h-screen">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
