import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../stores/slices/theme.slice";
import { drawerWidth } from "../Layout/layoutStyles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import BrightnessAutoIcon from "@mui/icons-material/BrightnessAuto";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { logout } from "../../stores/slices/user.slice";
import toast from "react-hot-toast";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        [theme.breakpoints.up("sm")]: {
          marginLeft: drawerWidth,
          // width: `calc(100% - ${drawerWidth}px)`,
        },
      },
    },
  ],
}));

const Header = React.memo(({ open, handleDrawerOpenClose, isMobile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { themeMode } = useSelector((state) => state.theme);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [themeAnchorEl, setThemeAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    const res = dispatch(logout()).unwrap();
    toast.promise(res, {
      loading: "Logging out...",
      success: () => {
        // return "Logged out successfully!";
      },
      error: (err) => err || "Logout failed.",
    });
    handleClose();
  };
  const handleProfile = () => {
    navigate("/settings", { state: { tabIndex: 1 } });
    handleClose();
  };
  return (
    <AppBar position="fixed" open={open && !isMobile} >
      <Toolbar>
        <div className="flex items-center justify-between w-full">
          {/* Left Side */}
          <div className="flex items-center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpenClose}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {/* Header Text */}
              Xeon
            </Typography>
          </div>
          {/* Right Side */}
          <div className="flex items-center gap-2">
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => toast.success("No new notifications")}
              aria-label="Notifications"
            >
              <NotificationsIcon />
            </IconButton>
            {/* Theme Dropdown */}
            <IconButton
              color="inherit"
              edge="end"
              onClick={(e) => setThemeAnchorEl(e.currentTarget)}
              aria-haspopup="true"
              aria-controls="theme-menu"
              aria-label="Select theme"
            >
              {themeMode === "system" ? (
                <BrightnessAutoIcon />
              ) : themeMode === "light" ? (
                <LightModeIcon />
              ) : (
                <DarkModeIcon />
              )}
            </IconButton>
            <Menu
              id="theme-menu"
              anchorEl={themeAnchorEl}
              open={Boolean(themeAnchorEl)}
              onClose={() => setThemeAnchorEl(null)}
            >
              <MenuItem
                selected={themeMode === "light"}
                onClick={() => {
                  dispatch(setTheme("light"));
                  setThemeAnchorEl(null);
                }}
              >
                <LightModeIcon fontSize="small" sx={{ mr: 1 }} />
                Light
              </MenuItem>
              <MenuItem
                selected={themeMode === "dark"}
                onClick={() => {
                  dispatch(setTheme("dark"));
                  setThemeAnchorEl(null);
                }}
              >
                <DarkModeIcon fontSize="small" sx={{ mr: 1 }} />
                Dark
              </MenuItem>
              <MenuItem
                selected={themeMode === "system"}
                onClick={() => {
                  dispatch(setTheme("system"));
                  setThemeAnchorEl(null);
                }}
              >
                <BrightnessAutoIcon fontSize="small" sx={{ mr: 1 }} />
                System
              </MenuItem>
            </Menu>

            {/* User Profile */}
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              edge="end"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem onClick={handleLogout} className="text-red-500!">
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
});

export default Header;
