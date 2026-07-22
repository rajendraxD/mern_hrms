import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/features/auth/login/Login.jsx";
import { ProtectedRoute, PublicRoute } from "./utils/RouteProtected.jsx";
import Dashboard from "./pages/features/dashboard/Dashboard.jsx";
import Loading from "./components/common/Loading.jsx";
import useAuth from "./hooks/useAuth.js";
import { useEffect } from "react";

export default function App() {
  const { initialLoading, me } = useAuth();

  useEffect(() => {
    me();
  }, [me]);

  if (initialLoading) {
    return <div className="flex justify-center items-center h-screen"><Loading /></div>;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
