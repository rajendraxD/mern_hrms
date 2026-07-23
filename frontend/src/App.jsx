import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/features/auth/login/Login.jsx";
import { ProtectedRoute, PublicRoute } from "./utils/RouteProtected.jsx";
import Dashboard from "./pages/features/dashboard/Dashboard.jsx";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
