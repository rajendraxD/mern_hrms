import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/features/auth/login/LoginPage";
import ErrorBoundary from "./components/common/ErrorBoundary";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "./utils/MuiThemeProvider";

export default function App() {

  return (
    <ThemeProvider>
      <CssBaseline />
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary >
      </BrowserRouter>
    </ThemeProvider>
  );
}
