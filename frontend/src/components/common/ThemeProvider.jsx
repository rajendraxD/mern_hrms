import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { buildTheme } from "../../theme";
import { syncSystemTheme } from "../../store/slices/themeSlice";

export default function ThemeProvider({ children }) {
  const dispatch = useDispatch();
  const { resolved } = useSelector((state) => state.theme);
  const theme = useMemo(() => buildTheme(resolved), [resolved]);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => dispatch(syncSystemTheme());
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolved === "dark");
  }, [resolved]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
