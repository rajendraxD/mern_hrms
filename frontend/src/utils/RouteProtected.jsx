import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/common/Loading";
import useAuth from "../hooks/useAuth";
// import Loading from "../components/UI/Loading";
export const PublicRoute = () => {
    const { user, loading } = useAuth();
    if (loading) {
        return <Loading />;
    }
    if (user) {
        return <Navigate to="/dashboard" replace />;
    } else {
        return <Outlet />;
    }
};
export const ProtectedRoute = () => {
    const { user, loading } = useAuth();
    if (loading) {
        return <Loading />;
    }
    if (user) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" replace />;
    }
};
