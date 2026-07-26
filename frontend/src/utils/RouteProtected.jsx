import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./constants";
import Loading from "../components/common/Loading";

export const ProtectedRoute = () => {
  const { accessToken, initialLoading } = useSelector((s) => s.user);

  // Wait for the refresh-token attempt to finish before redirecting
  if (initialLoading) return <Loading fullScreen />;

  return accessToken ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};

export const PublicRoute = () => {
  const { accessToken, initialLoading } = useSelector((s) => s.user);

  // Wait for the refresh-token attempt to finish before redirecting
  if (initialLoading) return <Loading fullScreen />;

  return accessToken ? <Navigate to={ROUTES.DASHBOARD} replace /> : <Outlet />;
};
