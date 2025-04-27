"use client";

import { useAuth } from "@/context/auth-context";
import {
  CarFront,
  ChevronsLeft,
  ChevronsRight,
  FilePenLine,
  Home,
  Settings2,
  Users
} from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "../ui/sidebar";
import { SidebarUserProfile } from "./user-profile";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    accessRole: [
      "ADMIN",
      "CASHIER",
      "SECURITY",
      "STUDENT",
      "STAFF",
      "GUEST",
      "UNVERIFIED",
      "SUPERADMIN"
    ]
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users,
    accessRole: ["ADMIN", "SUPERADMIN"]
  },
  {
    title: "Vehicle Sticker",
    url: "/dashboard/sticker",
    icon: CarFront,
    accessRole: ["CASHIER"]
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings2,
    accessRole: []
  },
  {
    title: "Violations",
    url: "/dashboard/violations",
    icon: FilePenLine,
    accessRole: ["ADMIN", "SUPERADMIN"]
  }
];

export const AppSidebar = () => {
  const { state, toggleSidebar } = useSidebar();
  const { user } = useAuth();

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-between pl-1">
            <div className={`${state === "collapsed" ? "hidden" : "flex items-center gap-x-2"}`}>
              <img src="/neu-logo.png" alt="NEU Logo" className="w-[30px] h-[30px]" />
              <h3 className="truncate font-semibold text-2xl">{user?.role}</h3>
            </div>
            <div className="pr-2 hover:cursor-pointer">
              {state === "expanded" ? (
                <ChevronsLeft onClick={toggleSidebar} size={25} />
              ) : (
                <ChevronsRight onClick={toggleSidebar} size={25} />
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                if (!user?.role || !item.accessRole.includes(user?.role)) {
                  return;
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link href={item.url} prefetch={false}>
                        <item.icon />
                        <span className="text-base font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarUserProfile />
      </SidebarFooter>
    </Sidebar>
  );
};
