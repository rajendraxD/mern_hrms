import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import { useLocation, useNavigate } from "react-router-dom";
import navigation from "../../config/navigation";

const DRAWER_WIDTH = 260;

export default function DashboardSidebar({ mobileOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const content = (
    <Box sx={{ overflow: "auto" }}>
      <Toolbar>
        <Box
          component="span"
          sx={{
            fontWeight: 700,
            fontSize: "1.25rem",
            letterSpacing: ".1rem",
            color: "primary.main",
          }}
        >
          HRMS
        </Box>
      </Toolbar>
      <Divider />
      <List sx={{ px: 1 }}>
        {navigation.map((item) => {
          const active = location.pathname === item.path;
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={active}
                onClick={() => {
                  navigate(item.path);
                  onClose?.();
                }}
                sx={{
                  borderRadius: 2,
                  "&.Mui-selected": {
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    "&:hover": { bgcolor: "primary.dark" },
                    "& .MuiListItemIcon-root": { color: "primary.contrastText" },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: DRAWER_WIDTH },
        }}
      >
        {content}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            top: ["56px", "64px"],
            height: "auto",
            bottom: 0,
            borderRight: 1,
            borderColor: "divider",
          },
        }}
        open
      >
        {content}
      </Drawer>
    </>
  );
}

export { DRAWER_WIDTH };
