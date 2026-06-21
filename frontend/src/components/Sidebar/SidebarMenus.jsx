import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";

export const adminSidebarMenuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  {
    text: "Users",
    icon: <PeopleIcon />,
    path: "/users",
  },
];
export const userSidebarMenuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
];
export const sidebarBottomItems = [
  { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
];
