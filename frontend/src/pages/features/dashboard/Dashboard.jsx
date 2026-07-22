import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import useAuth from "../../../hooks/useAuth";
import ThemeToggle from "../../../components/common/ThemeToggle";

export default function Dashboard() {
  const { logout } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        px: 2,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          minWidth: 320,
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          Dashboard
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Theme:
          </Typography>
          <ThemeToggle />
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Paper>
    </Box>
  );
}
