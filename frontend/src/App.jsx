import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/features/auth/login/Login.jsx";
import { ProtectedRoute, PublicRoute } from "./utils/RouteProtected.jsx";
import Dashboard from "./pages/features/dashboard/Dashboard.jsx";
import ForgotPassword from "./pages/features/auth/forgotPassword/ForgotPassword.jsx";
import { ROUTES } from "./utils/constants.js";
import { me } from "./store/slices/userSlice.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Toaster } from 'react-hot-toast';

const AutoLogin = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUser() {
      try {
        await dispatch(me()).unwrap();
      } catch {
        //Manage by redux
        // console.log(err);
      }
    }
    fetchUser();
  }, [dispatch])

  return children

}
export default function App() {
  return (
    <BrowserRouter>
      <AutoLogin>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Navigate to={ROUTES.LOGIN} />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} />} />
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          </Route>

          <Route path="*" element={<h1 className="flex justify-center items-center h-screen md:text-4xl transition-all duration-500 ">404 | Page Not Found</h1>} />
        </Routes>
      </AutoLogin>
    </BrowserRouter>
  );
}
