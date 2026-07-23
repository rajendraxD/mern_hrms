import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/features/auth/login/Login.jsx";
import { ProtectedRoute, PublicRoute } from "./utils/RouteProtected.jsx";
import Dashboard from "./pages/features/dashboard/Dashboard.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { me } from "./store/slices/userSlice.js";

export default function App() {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    await dispatch(me());
  }
  useEffect(() => {
    fetchUser();
  }, [dispatch]);


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
