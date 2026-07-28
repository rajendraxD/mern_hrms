import { lazy, Suspense, useEffect, useRef } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute"
import { refreshTokenThunk } from "./app/slices/userSlice"
import { useDispatch, useSelector } from "react-redux"
import LoadingSpinner from "./components/LoadingSpinner"
import MainLayout from "./components/layout/main"

const LoginPage = lazy(() => import("./pages/features/auth/login/LoginPage"))
const RegisterPage = lazy(() => import("./pages/features/auth/register/registerPage"))
const DashboardPage = lazy(() => import("./pages/features/dashboard/DashboardPage"))

export default function App() {
  const dispatch = useDispatch();
  const { initialized, accessToken } = useSelector((s) => s.user);
  const mounted = useRef(false);

  // restore session from httpOnly cookie — non-blocking, resolves post-paint
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    if (!accessToken)
      dispatch(refreshTokenThunk());
  }, [dispatch, accessToken]);

  if (!initialized) {
    return (
      <div className="loading-screen">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<PublicRoute />} >
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route element={<ProtectedRoute />} >
            <Route element={<MainLayout />} >
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
