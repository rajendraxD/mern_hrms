import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/features/auth/login/LoginPage"
import RegisterPage from "./pages/features/auth/register/registerPage"
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute"
import DashboardPage from "./pages/features/dashboard/DashboardPage"
import { refreshTokenThunk } from "./app/slices/userSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { Toaster } from "react-hot-toast"
// import { Toaster } from "@/components/ui/toast"

export default function App() {
  const dispatch = useDispatch();
  const { initialized } = useSelector((s) => s.user);

  // Silent refresh on app load — restores session from httpOnly cookie
  useEffect(() => { dispatch(refreshTokenThunk()); }, [dispatch]);

  if (!initialized) {
    return (
      <div className="loading-screen">
        {/* <Loader2 size={36} className="spin" /> */}
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {/* <Toaster position="top-right" richColors theme="dark" /> */}
      {/* <Toaster/> */}
      <Routes>
        <Route element={<PublicRoute />} >
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />} >
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
