import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AppSidebar from "./sidebar/Sidebar"
import AppHeader from "./header/Header"
import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-2">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
