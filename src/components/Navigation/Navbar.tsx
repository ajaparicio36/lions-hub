"use client";

import { usePathname } from "next/navigation";
import { menuItems } from "./Sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function AppNavbar() {
  const pathname = usePathname();
  const currentPage =
    menuItems.find((item) => item.href === pathname)?.label || "Hub";

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-6 lg:h-[60px]">
      <SidebarTrigger />
      <div className="font-semibold">{currentPage}</div>
    </header>
  );
}