import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/features/auth/login/Login.jsx";
import { ProtectedRoute, PublicRoute } from "./utils/RouteProtected.jsx";
import Dashboard from "./pages/features/dashboard/Dashboard.jsx";
import DashboardLayout from "./components/layout/DashboardLayout";
import Loading from "./components/common/Loading.jsx";
import Box from "@mui/material/Box";
import useAuth from "./hooks/useAuth.js";
import { useEffect } from "react";

export default function App() {
  const { initialLoading, me } = useAuth();

  useEffect(() => {
    me();
  }, [me]);

  if (initialLoading) {
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

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
