import { AppSidebar } from "@/pages/Dashboard/components/AppSidebar";
import { SiteHeader } from "@/pages/Dashboard/components/DashboardHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import Modals from "@/components/Modal";

export default function DashboardLayout() {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset className="p-4 md:p-6">
            <Outlet />
          </SidebarInset>
        </div>
      </SidebarProvider>

      <Modals />
    </div>
  );
}
