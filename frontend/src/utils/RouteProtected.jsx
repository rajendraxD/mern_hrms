import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const { user } = useSelector(state => state.user)
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

export const ProtectedRoute = () => {
  const { user, loading } = useSelector(state => state.user)
  if (loading) return <h2>Loading...</h2>
  if (user) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};
