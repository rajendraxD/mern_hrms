import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./constants";
import Loading from "../components/common/Loading";

export const PublicRoute = () => {
  const { isAuthenticated, user, loading } = useSelector(state => state.user)
  if (loading) return <Loading />;
  if (isAuthenticated && user) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }
  return <Outlet />;
};

export const ProtectedRoute = () => {
  const { isAuthenticated, user, initialLoading } = useSelector(state => state.user)
  if (initialLoading) return <Loading />;
  if (isAuthenticated && user) {
    return <Outlet />;
  }
  return <Navigate to={ROUTES.LOGIN} replace />;
};
