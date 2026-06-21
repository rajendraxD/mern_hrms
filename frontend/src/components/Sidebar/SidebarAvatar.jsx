import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { getAvatarUrl } from "../../utils/getAvatarUrl";

export default function SidebarAvatar({ open, handleDrawerOpenClose, user, onEditAvatar }) {
    const avatarSize = open ? 75 : 38;

    return (
        <Box sx={{ position: "relative", display: "inline-flex" }}>
            <Avatar
                alt={user?.name || "User"}
                src={getAvatarUrl(user?.avatar)}
                onClick={() => !open && handleDrawerOpenClose()}
                className={`${!open && "cursor-pointer"}`}
                sx={{
                    width: avatarSize,
                    height: avatarSize,
                    transition: "all 0.3s ease-in-out",
                    fontSize: open ? "3rem" : "1.5rem",
                    color: "#fff",
                    fontWeight: 600,
                }}
            />

            {/* Edit avatar button - visible on hover */}
            {
                open &&
                <Tooltip title="Change profile picture" arrow>
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            onEditAvatar?.(e);
                        }}
                        size="small"
                        sx={{
                            position: "absolute",
                            bottom: -4,
                            right: -4,
                            bgcolor: "background.paper",
                            boxShadow: 2,
                            width: open ? 28 : 22,
                            height: open ? 28 : 22,
                            transition: "all 0.2s ease-in-out",
                            opacity: 0.85,
                            "&:hover": {
                                opacity: 1,
                                bgcolor: "primary.main",
                                color: "#fff",
                                transform: "scale(1.15)",
                            },
                        }}
                    >
                        <AddAPhotoIcon sx={{ fontSize: open ? 16 : 12 }} />
                    </IconButton>
                </Tooltip>
            }
        </Box>
    );
}
