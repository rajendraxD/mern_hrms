import { Navigate, Outlet, } from 'react-router-dom';
import { useSelector } from 'react-redux';

// ponytail: no loading state here — App.jsx handles initialized guard
const ProtectedRoute = () => {
  const { accessToken } = useSelector((s) => s.user);
  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};
const PublicRoute = () => {
  const { accessToken } = useSelector((s) => s.user);
  return !accessToken ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export { ProtectedRoute, PublicRoute };
