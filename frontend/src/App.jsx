import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ToasterNotifications from "./components/common/ToasterNotifications";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/login/LoginPage";
import { ProtectedRoute, PublicRoute } from "./utils/RouteProtected";
import DashboardPage from "./pages/dashboard/DashboardPage";
import { refreshTokenThunk } from "./store/slices/userSlice";

function App() {
  const dispatch = useDispatch();

  // Attempt to restore the session from the httpOnly refresh-token cookie
  // on every hard navigation / page refresh.
  useEffect(() => {
    dispatch(refreshTokenThunk());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToasterNotifications limit={3} position="top-right" reverseOrder={false} />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App