import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

export const PublicRoute = () => {
  const { user, isLoading } = useSelector((state) => state.user);
  if (isLoading) {
    return (
      <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

export const ProtectedRoute = () => {
  const { user, isLoading } = useSelector((state) => state.user);
  // Only show loading spinner during initial load (when we haven't loaded the user yet)
  if (isLoading && !user) {
    return (
      <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (user) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};
