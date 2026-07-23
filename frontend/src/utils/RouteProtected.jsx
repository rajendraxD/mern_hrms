import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const PublicRoute = () => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

export const ProtectedRoute = () => {
  const { user,loading } = useAuth();
  if(loading) return <h2>Loading...</h2>
  if (user) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};
