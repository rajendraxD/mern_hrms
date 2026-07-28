import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import {
  LayoutDashboard, Users, CalendarCheck, CalendarDays,
  Wallet, BarChart3, Settings,
} from "lucide-react"
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
} from "@/components/ui/sidebar"

const NAV_ITEMS = [
  {
    group: "Main",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
      { label: "Employees", icon: Users, url: "/employees" },
    ],
  },
  {
    group: "Time",
    items: [
      { label: "Attendance", icon: CalendarCheck, url: "/attendance" },
      { label: "Leave", icon: CalendarDays, url: "/leave" },
    ],
  },
  {
    group: "Finance",
    items: [
      { label: "Payroll", icon: Wallet, url: "/payroll" },
    ],
  },
  {
    group: "Analytics",
    items: [
      { label: "Reports", icon: BarChart3, url: "/reports" },
      { label: "Settings", icon: Settings, url: "/settings" },
    ],
  },
]

export default function AppSidebar() {
  const { user } = useSelector((s) => s.user)
  const { pathname } = useLocation()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-sidebar-border border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link to="/dashboard" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <span className="text-sm font-bold">H</span>
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">HRMS</span>
                <span className="text-xs text-muted-foreground">Management</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {NAV_ITEMS.map((group) => (
          <SidebarGroup key={group.group}>
            <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      render={<Link to={item.url} />}
                      tooltip={item.label}
                      isActive={pathname === item.url}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-sidebar-border border-t p-2">
        {user && (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" render={<Link to="/profile" />}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-accent-foreground">
                  <span className="text-sm font-medium">{user.name?.[0] || "U"}</span>
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
