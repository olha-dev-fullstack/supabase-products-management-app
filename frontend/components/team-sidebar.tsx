"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { House, PersonStanding, ShoppingBag } from "lucide-react";
import Link from "next/link";

export function AppSidebar({ teamId, teamName }: { teamId: string, teamName: string }) {
  const origin = window.location.origin;
  return (
    <Sidebar variant="sidebar" collapsible="icon" className="sticky">
      <SidebarHeader>
        <div className="flex items-center">
          <House />
          <span className="text-lg font-semibold px-4 py-2 group-data-[collapsible=icon]:hidden">
            {teamName}
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenuButton asChild>
            <Link href={`${origin}/protected/team/${teamId}/products`}>
              <ShoppingBag />
              <span>Products</span>
            </Link>
          </SidebarMenuButton>
          <SidebarMenuButton asChild>
            <Link href={`${origin}/protected/team/${teamId}/members`}>
              <PersonStanding />
              <span>Members</span>
            </Link>
          </SidebarMenuButton>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
