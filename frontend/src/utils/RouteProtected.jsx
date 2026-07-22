import { Navigate, Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Loading from "../components/common/Loading";
import useAuth from "../hooks/useAuth";

export const PublicRoute = () => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        <Loading />
      </Box>
    );
  }
  if (user) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};
