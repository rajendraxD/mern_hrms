import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOsPrefersDark } from "../stores/slices/theme.slice";
import useResolvedTheme from "../hooks/useResolvedTheme";

const MuiThemeProvider = ({ children }) => {
  const dispatch = useDispatch();
  const resolvedMode = useResolvedTheme();

  // Single media query listener — dispatches OS preference to Redux
  const { themeMode } = useSelector((state) => state.theme);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Sync initial value on mount
    dispatch(setOsPrefersDark(mediaQuery.matches));

    if (themeMode !== "system") return;

    const handler = (e) => dispatch(setOsPrefersDark(e.matches));
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [themeMode, dispatch]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: resolvedMode,
          ...(resolvedMode === "light"
            ? {
                // Light mode colors
                primary: {
                  main: "#3b82f6",
                  light: "#60a5fa",
                  dark: "#2563eb",
                },
                secondary: {
                  main: "#8b5cf6",
                  light: "#a78bfa",
                  dark: "#7c3aed",
                },
                background: {
                  default: "#ffffff",
                  paper: "#f8f9fa",
                },
                text: {
                  primary: "#212529",
                  secondary: "#6c757d",
                },
                success: {
                  main: "#10b981",
                },
                error: {
                  main: "#ef4444",
                },
                warning: {
                  main: "#f59e0b",
                },
              }
            : {
                // Dark mode colors
                primary: {
                  main: "#60a5fa",
                  light: "#93c5fd",
                  dark: "#3b82f6",
                },
                secondary: {
                  main: "#a78bfa",
                  light: "#c4b5fd",
                  dark: "#8b5cf6",
                },
                background: {
                  default: "#0f172a",
                  paper: "#1e293b",
                },
                text: {
                  primary: "#f1f5f9",
                  secondary: "#cbd5e1",
                },
                success: {
                  main: "#34d399",
                },
                error: {
                  main: "#f87171",
                },
                warning: {
                  main: "#fbbf24",
                },
              }),
        },
        typography: {
          fontFamily: "'Inter', sans-serif",
          button: {
            fontFamily: "'Outfit', sans-serif",
            textTransform: "capitalize",
            fontWeight: 500,
          },
        },
        shape: {
          borderRadius: 5,
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                // This creates the smooth "fade" effect
                transition: "background-color 0.3s ease, color 0.3s ease",
              },
            },
          },
        },
      }),
    [resolvedMode],
  );

  useEffect(() => {
    // Persist the resolved mode so the inline script in index.html
    // can apply the correct class before React hydrates
    localStorage.setItem("resolvedTheme", resolvedMode);

    if (resolvedMode === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.style.backgroundColor = "#0f172a";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.backgroundColor = "#ffffff";
    }
  }, [resolvedMode]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiThemeProvider;
