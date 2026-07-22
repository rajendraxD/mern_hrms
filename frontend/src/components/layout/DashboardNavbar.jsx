import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useState, useCallback } from "react";
import ThemeToggle from "../common/ThemeToggle";
import useAuth from "../../hooks/useAuth";

export default function DashboardNavbar({ onToggleDrawer }) {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleLogout = useCallback(async () => {
    handleClose();
    await logout();
  }, [handleClose, logout]);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "background.default",
        color: "text.primary",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onToggleDrawer}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
          {user?.name ? `${user.name.split(" ")[0]}'s Workspace` : "Dashboard"}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <ThemeToggle />

        <Tooltip title="Account settings">
          <IconButton onClick={handleMenu} sx={{ ml: 1, p: 0 }}>
            <Avatar
              sx={{ width: 34, height: 34, bgcolor: "primary.main", fontSize: 14 }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </Avatar>
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          slotProps={{ paper: { sx: { minWidth: 180, mt: 1 } } }}
        >
          <MenuItem disabled>
            <Typography variant="body2" fontWeight={600}>
              {user?.name || "User"}
            </Typography>
          </MenuItem>

          <Divider />

          <MenuItem>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>

          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
