"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Trophy,
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
import { logout } from "@/lib/logout";
import { ThemeSwitcher } from "../Themes/ThemeSwitcher";

export const menuItems = [
  { icon: Home, label: "Hub", href: "/app" },
  { icon: Trophy, label: "Tournaments", href: "/app/tournaments" },
  { icon: MessageCircle, label: "Chat", href: "/app/chat" },
  { icon: Settings, label: "Settings", href: "/app/settings" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const { userData } = useUserData();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      router.push("/account");
    } else {
      console.error("Logout failed");
      // You might want to show an error message to the user here
    }
  };

  const userPhotoUrl = user?.photoURL || "";
  const userInitial = userData?.ign ? userData.ign[0].toUpperCase() : "?";

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="p-4 text-center">
            <SidebarMenuButton className="items-center" asChild>
              <span className="font-bold text-lg">Lions Hub</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem className="py-2" key={item.href}>
              <SidebarMenuButton
                asChild
                className="py-2"
                isActive={pathname === item.href}
              >
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
        <ThemeSwitcher variant="full" />
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
