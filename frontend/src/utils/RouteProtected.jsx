import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const { isAuthenticated, user, initialLoading } = useSelector(state => state.user)
  if (initialLoading) return null;
  if (isAuthenticated && user) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

export const ProtectedRoute = () => {
  const { isAuthenticated, user, initialLoading, loading } = useSelector(state => state.user)
  if (initialLoading) return null;
  if (loading) return <h2>Loading...</h2>
  if (isAuthenticated && user) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};
