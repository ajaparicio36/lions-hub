"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Trophy,
  BarChart2,
  MessageCircle,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";

export const menuItems = [
  { icon: Home, label: "Hub", href: "/app" },
  { icon: Users, label: "Team", href: "/app/team" },
  { icon: Trophy, label: "Tournaments", href: "/app/tournaments" },
  { icon: BarChart2, label: "Statistics", href: "/app/statistics" },
  { icon: MessageCircle, label: "Chat", href: "/app/chat" },
  { icon: Settings, label: "Settings", href: "/app/settings" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/app" className="flex items-center gap-2">
                <Home className="h-6 w-6" />
                <span className="font-bold">VALORANT Team Hub</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href} className="flex items-center gap-2">
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>{/* Add footer content if needed */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
