import { usePathname } from "next/navigation";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import {
  Building,
  FileText,
  Heart,
  Home,
  Menu,
  Settings,
  X,
} from "lucide-react";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

const AppSidebar = ({ userType }: AppSidebarProps) => {
  const pathname = usePathname();
  const { toggleSidebar, open } = useSidebar();

  const navLinks =
    userType === "manager"
      ? [
          { icon: Building, label: "Properties", href: "/managers/properties" },
          {
            icon: FileText,
            label: "Applications",
            href: "/managers/applications",
          },
          { icon: Settings, label: "Settings", href: "/managers/settings" },
        ]
      : [
          { icon: Heart, label: "Favorites", href: "/tenants/favorites" },
          {
            icon: FileText,
            label: "Applications",
            href: "/tenants/applications",
          },
          { icon: Home, label: "Residences", href: "/tenants/residences" },
          { icon: Settings, label: "Settings", href: "/tenants/settings" },
        ];

  return (
    // DESIGN CHANGE: Light sidebar with glassmorphism matching landing page
    <Sidebar
      collapsible="icon"
      className="fixed left-0 bg-white/80 backdrop-blur-xl shadow-xl border-r border-gray-200/50"
      style={{
        top: `${NAVBAR_HEIGHT}px`,
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
      }}
    >
      {/* DESIGN CHANGE: Subtle gradient overlay matching landing page */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-white/50 to-purple-50/30 pointer-events-none"></div>

      <SidebarHeader className="relative z-10">
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={cn(
                "flex min-h-[56px] w-full items-center pt-3 mb-3",
                open ? "justify-between px-6" : "justify-center"
              )}
            >
              {open ? (
                <>
                  {/* DESIGN CHANGE: Gradient text matching landing page */}
                  <div>
                    <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {userType === "manager" ? "Manager" : "Renter"}
                    </h1>
                    <p className="text-xs text-gray-600 mt-0.5">Dashboard</p>
                  </div>
                  <button
                    className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
                    onClick={() => toggleSidebar()}
                  >
                    <X className="h-5 w-5 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" />
                  </button>
                </>
              ) : (
                <button
                  className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
                  onClick={() => toggleSidebar()}
                >
                  <Menu className="h-5 w-5 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" />
                </button>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="relative z-10">
        <SidebarMenu className="space-y-1.5 px-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "flex items-center rounded-xl transition-all duration-300 group relative overflow-hidden",
                    open ? "px-4 py-3" : "px-3 py-3 justify-center",
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl"
                      : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
                  )}
                >
                  <Link href={link.href} className="w-full" scroll={false}>
                    {/* DESIGN CHANGE: Active indicator matching landing page gradient */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-lg"></div>
                    )}

                    <div
                      className={cn(
                        "flex items-center w-full",
                        open ? "gap-3" : "justify-center"
                      )}
                    >
                      {/* DESIGN CHANGE: Icon styling matching landing page */}
                      <div
                        className={cn(
                          "relative flex items-center justify-center rounded-lg transition-all duration-300",
                          isActive
                            ? "bg-white/20"
                            : "group-hover:bg-blue-100/50"
                        )}
                      >
                        <link.icon
                          className={cn(
                            "h-5 w-5 transition-all duration-300",
                            isActive
                              ? "text-white"
                              : "text-gray-700 group-hover:text-blue-600"
                          )}
                        />
                      </div>

                      {/* Label */}
                      {open && (
                        <span
                          className={cn(
                            "font-semibold text-sm transition-colors duration-300",
                            isActive
                              ? "text-white"
                              : "text-gray-700 group-hover:text-blue-600"
                          )}
                        >
                          {link.label}
                        </span>
                      )}

                      {/* DESIGN CHANGE: Arrow for active item */}
                      {open && isActive && (
                        <svg
                          className="ml-auto h-4 w-4 text-white"
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
                      )}
                    </div>

                    {/* DESIGN CHANGE: Subtle hover effect */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/0 to-purple-100/0 group-hover:from-blue-100/30 group-hover:to-purple-100/30 rounded-xl transition-all duration-300"></div>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        {/* DESIGN CHANGE: Help card matching landing page design */}
        {open && (
          <div className="absolute bottom-6 left-3 right-3">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200/50 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">
                    Need Help?
                  </h3>
                  <p className="text-xs text-gray-600 mb-3">
                    Get support anytime
                  </p>
                  <button className="text-xs font-semibold text-blue-600 hover:text-purple-600 transition-colors duration-200 flex items-center gap-1.5">
                    Contact Support
                    <svg
                      className="w-3 h-3"
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
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>

      {/* DESIGN CHANGE: Gradient border matching landing page */}
      <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-300/50 to-transparent"></div>
    </Sidebar>
  );
};

export default AppSidebar;
