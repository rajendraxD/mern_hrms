import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import { drawerWidth, openedMixin, closedMixin } from "../Layout/layoutStyles";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
// import { useSelector } from "react-redux";
import TooltipComponent from "../common/Tooltip";
import {
  adminSidebarMenuItems,
  sidebarBottomItems,
  userSidebarMenuItems,
} from "./SidebarMenus";
import SettingsIcon from "@mui/icons-material/Settings";
import Toolbar from "@mui/material/Toolbar";

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": {
          ...openedMixin(theme),
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
        },
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": {
          ...closedMixin(theme),
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
        },
      },
    },
  ],
}));

const user = {
  name: "Rajendra kumar",
  email: "rajendraxd1@gmail.com"
}
const Sidebar = React.memo(({ open, handleDrawerOpenClose, isMobile }) => {
  const [copied, setCopied] = React.useState(false);
  // const { user } = useSelector((state) => state.user);
  const theme = useTheme();
  const [sideBarMenuItems, setSideBarMenuItems] = React.useState([]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(user?.email);
      setCopied(true);
      // Reset the "Copied" message after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  React.useEffect(() => {
    if (user) {
      switch (user?.role) {
        case "admin":
          setSideBarMenuItems(adminSidebarMenuItems);
          break;
        case "user":
          setSideBarMenuItems(userSidebarMenuItems);
          break;
      }
    }
  }, [user, adminSidebarMenuItems, userSidebarMenuItems, sidebarBottomItems]);
  const listRef = React.useRef(null);
  const [showTopScrollIndicator, setShowTopScrollIndicator] =
    React.useState(false);
  const [showBottomScrollIndicator, setShowBottomScrollIndicator] =
    React.useState(false);

  const checkScroll = React.useCallback(() => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      setShowTopScrollIndicator(scrollTop > 0);
      setShowBottomScrollIndicator(scrollTop + clientHeight < scrollHeight - 2);
    }
  }, []);

  React.useEffect(() => {
    checkScroll();
    // Re-check on window resize as layout might change
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll, open, sideBarMenuItems]);

  const drawerContent = (
    <>
      <Toolbar />
      {/* User Profile Section */}
      <Box
        sx={{
          py: 1.5,
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: 2,
        }}
      >
        <div className="flex flex-col justify-center items-center max-w-50 overflow-hidden transition-all duration-300 mx-auto">
          {/* The Avatar stays the same, only the size prop changes */}
          <div className="relative p-[3px] rounded-full bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600">
            <div
              className={`p-[2px] rounded-full
                ${theme.palette.mode === "light" ? "bg-white" : "bg-gray-900"}
                `}
            >
              <Avatar
                alt={user?.name || "User"}
                src={user?.avatar || undefined}
                onClick={() => !open && handleDrawerOpenClose()}
                className={`${!open && "cursor-pointer"}`}
                // imgProps={{ loading: "lazy", draggable: false }}
                sx={{
                  width: open ? 75 : 38,
                  height: open ? 75 : 38,
                  transition: "all 0.3s ease-in-out",
                  fontSize: open ? "3rem" : "1.5rem",
                  // bgcolor: avatarBg,
                  color: "#fff",
                  fontWeight: 600,
                }}
              />
            </div>
          </div>
          {/* Animate Height and Opacity */}
          <div
            className={`grid transition-all duration-300 ease-in-out ${open
              ? "grid-rows-[1fr] opacity-100 mt-2"
              : "grid-rows-[0fr] opacity-0 mt-0"
              }`}
          >
            <Box className="flex flex-col justify-center items-center overflow-hidden w-full">
              <span className="text-[18px] font-bold truncate w-full text-center select-none">
                {user?.name}
              </span>
              <Tooltip title={copied ? "Copied!" : "Click to copy email"} arrow>
                <span
                  onClick={handleCopy}
                  className="text-[16px] font-light truncate w-full text-center cursor-pointer active:scale-95 select-none"
                >
                  {user?.email}
                </span>
              </Tooltip>
            </Box>
          </div>
        </div>
      </Box>
      <Divider />

      <Box
        sx={{
          position: "relative",
          flexGrow: 1,
          width: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {!open && showTopScrollIndicator && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              zIndex: 1,
              pt: 0.5,
              background: (t) =>
                `linear-gradient(to bottom, ${t.palette.background.paper}ee, transparent)`,
              pointerEvents: "none",
            }}
          >
            <ExpandLessIcon color="action" fontSize="small" />
          </Box>
        )}

        <List
          ref={listRef}
          onScroll={checkScroll}
          sx={{
            width: "100%",
            flexGrow: 1,
            overflowX: "hidden",
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollBehavior: "smooth",
            ...(!open && {
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }),
          }}
        >
          {sideBarMenuItems.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <TooltipComponent
                title={!open ? item.text : ""}
                placement="right"
              >
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  draggable={false}
                  sx={[
                    {
                      minHeight: 48,
                      px: 2.5,
                      "&.active": {
                        bgcolor: theme.palette.action.selected,
                        color: theme.palette.primary.main,
                        "& .MuiListItemIcon-root": {
                          color: theme.palette.primary.main,
                        },
                      },
                    },
                    open
                      ? {
                        justifyContent: "initial",
                      }
                      : {
                        justifyContent: "center",
                      },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      {
                        minWidth: 0,
                        justifyContent: "center",
                      },
                      open
                        ? {
                          mr: 3,
                        }
                        : {
                          mr: "auto",
                        },
                    ]}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={[
                      open
                        ? {
                          opacity: 1,
                        }
                        : {
                          opacity: 0,
                        },
                    ]}
                  />
                </ListItemButton>
              </TooltipComponent>
            </ListItem>
          ))}
        </List>
        {!open && showBottomScrollIndicator && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              pb: 0.5,
              background: (t) =>
                `linear-gradient(to top, ${t.palette.background.paper}ee, transparent)`,
              pointerEvents: "none",
            }}
          >
            <ExpandMoreIcon color="action" fontSize="small" />
          </Box>
        )}
      </Box>

      <Divider />
      <Box
        sx={{
          mt: "auto",
        }}
      >
        <List>
          {sidebarBottomItems.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <TooltipComponent
                title={!open ? item.text : ""}
                placement="right"
              >
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  draggable={false}
                  sx={[
                    {
                      minHeight: 48,
                      px: 2.5,
                      "&.active": {
                        bgcolor: theme.palette.action.selected,
                        color: theme.palette.primary.main,
                        "& .MuiListItemIcon-root": {
                          color: theme.palette.primary.main,
                        },
                      },
                    },
                    open
                      ? {
                        justifyContent: "initial",
                      }
                      : {
                        justifyContent: "center",
                      },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      {
                        minWidth: 0,
                        justifyContent: "center",
                      },
                      open
                        ? {
                          mr: 3,
                        }
                        : {
                          mr: "auto",
                        },
                    ]}
                  >
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Settings"
                    sx={[
                      open
                        ? {
                          opacity: 1,
                        }
                        : {
                          opacity: 0,
                        },
                    ]}
                  />
                </ListItemButton>
              </TooltipComponent>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );

  if (isMobile) {
    return (
      <MuiDrawer
        variant="temporary"
        open={open}
        onClose={handleDrawerOpenClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          },
        }}
      >
        {drawerContent}
      </MuiDrawer>
    );
  }

  return (
    <StyledDrawer variant="permanent" open={open}>
      {drawerContent}
    </StyledDrawer>
  );
});

export default Sidebar;
