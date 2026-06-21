import Avatar from "@mui/material/Avatar";

export default function SidebarAvatar({ open, handleDrawerOpenClose, user }) {
    return (
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
    )
}
