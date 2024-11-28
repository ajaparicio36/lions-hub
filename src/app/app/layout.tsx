import { AppSidebar } from "@/components/Navigation/Sidebar";
import { AppNavbar } from "@/components/Navigation/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <AppNavbar />
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
