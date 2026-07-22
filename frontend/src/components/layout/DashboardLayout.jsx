import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar, { DRAWER_WIDTH } from "./DashboardSidebar";

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggleDrawer = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <DashboardNavbar onToggleDrawer={handleToggleDrawer} />

      <DashboardSidebar mobileOpen={mobileOpen} onClose={handleDrawerClose} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
