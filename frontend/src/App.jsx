import { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginPage from "./pages/features/auth/login/LoginPage";
import DashboardPage from "./pages/features/dashboard/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorBoundary from "./components/common/ErrorBoundary";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "./utils/MuiThemeProvider";
import Layout from "./components/layout/Layout";
import { PublicRoute, ProtectedRoute } from "./utils/RouteProtected";
import { getUser } from "./stores/slices/user.slice";

function AuthInit() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <BrowserRouter>
        <AuthInit />
        <ErrorBoundary>
          <Routes>
            {/* Public routes */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>

            {/* Protected routes with sidebar layout */}
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Route>
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  );
}
