import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/UI/Loading";
export const PublicRoute = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  if (isLoading) {
    return <Loading />;
  }
  if (user) {
    return <Navigate to="/dashboard" replace />;
  } else {
    return <Outlet />;
  }
};
export const ProtectedRoute = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  if (isLoading) {
    return <Loading />;
  }
  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
};
