import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LuggageIcon from "@mui/icons-material/Luggage";
import PaymentsIcon from "@mui/icons-material/Payments";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SettingsIcon from "@mui/icons-material/Settings";

const navigation = [
  { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { label: "Employees", path: "/dashboard/employees", icon: <PeopleIcon /> },
  { label: "Attendance", path: "/dashboard/attendance", icon: <CalendarMonthIcon /> },
  { label: "Leave", path: "/dashboard/leave", icon: <LuggageIcon /> },
  { label: "Payroll", path: "/dashboard/payroll", icon: <PaymentsIcon /> },
  { label: "Reports", path: "/dashboard/reports", icon: <AssessmentIcon /> },
  { label: "Departments", path: "/dashboard/departments", icon: <ApartmentIcon /> },
  { label: "Settings", path: "/dashboard/settings", icon: <SettingsIcon /> },
];

export default navigation;
