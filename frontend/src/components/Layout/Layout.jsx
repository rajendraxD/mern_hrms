import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiThemeProvider from "../../utils/MuiThemeProvider";
import useBreakpoint from "../../hooks/useBreakpoint";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { DrawerHeader } from "./layoutStyles";
// import { Toaster } from "react-hot-toast";

export default function Layout() {
  const { isMobile } = useBreakpoint();
  const [open, setOpen] = React.useState(!isMobile);
  React.useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const handleDrawerOpenClose = React.useCallback(() => {
    setOpen((prev) => !prev);
  }, []);
  return (
    <MuiThemeProvider>
      <CssBaseline />
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <Header
          open={open}
          handleDrawerOpenClose={handleDrawerOpenClose}
          isMobile={isMobile}
        />
        <Sidebar
          open={open}
          handleDrawerOpenClose={handleDrawerOpenClose}
          isMobile={isMobile}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            overflow: "hidden",
            px: isMobile ? 2 : 3,
            py: 2,
            minWidth: 0,
          }}
        >
          <DrawerHeader />
        </Box>
      </Box>
      {/* <Toaster position="top-right" reverseOrder={true} /> */}
    </MuiThemeProvider>
  );
}
