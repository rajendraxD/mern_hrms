import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/features/auth/login/LoginPage";
import ErrorBoundary from "./components/common/ErrorBoundary";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "./utils/MuiThemeProvider";
import Layout from "./components/layout/Layout";

export default function App() {

  return (
    <ThemeProvider>
      <CssBaseline />
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<LoginPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </ErrorBoundary >
      </BrowserRouter>
    </ThemeProvider>
  );
}
