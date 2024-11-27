"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Users,
  Trophy,
  BarChart2,
  MessageCircle,
  Settings,
  MoreVertical,
  User,
  LogOut,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/hooks/useAuth";
import { useUserData } from "@/hooks/useUserData";

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
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { userData } = useUserData();

  const handleLogout = async () => {
    await signOut();
    router.push("/account");
  };

  const userPhotoUrl = user?.photoURL || "";
  const userInitial = userData?.ign ? userData.ign[0].toUpperCase() : "?";

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <span className="font-bold">Lions Hub</span>
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
      <SidebarFooter>
        <div className="flex items-start justify-between p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={userPhotoUrl} />
              <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-ellipsis">
                {userData?.ign}
              </span>
              <span className="text-xs text-muted-foreground text-ellipsis">
                {user?.email}
              </span>
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56" align="end" side="top">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 justify-start"
                  >
                    <User className="h-4 w-4" />
                    <span>Account Settings</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 justify-start"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
