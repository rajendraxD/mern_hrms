import { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { syncSystemTheme } from "../store/slices/themeModeSlice";

const MuiThemeProvider = ({ children }) => {
  const dispatch = useDispatch();
  const resolved = useSelector((state) => state.theme.resolved);

  // Sync system theme when OS preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => dispatch(syncSystemTheme());
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [dispatch]);

  // Apply dark class to <html> for Tailwind dark mode
  useEffect(() => {
    const root = document.documentElement;
    if (resolved === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [resolved]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: resolved,
          ...(resolved === "dark"
            ? {
              background: {
                default: "#0f172a", // slate-900
                paper: "#1e293b", // slate-800
              },
              text: {
                primary: "#f1f5f9", // slate-100
                secondary: "#94a3b8", // slate-400
              },
            }
            : {
              background: {
                default: "#f8fafc", // slate-50
                paper: "#ffffff",
              },
              text: {
                primary: "#0f172a", // slate-900
                secondary: "#475569", // slate-600
              },
            }),
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 5,
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                "& .MuiInputBase-root": {
                  borderRadius: 5,
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                // "& .MuiCardHeader-root": {
                //   borderRadius: 1,
                // },
                // "& .MuiCardContent-root": {
                //   borderRadius: 1,
                // },
              },
            },
          },
          MuiAlert: {
            styleOverrides: {
              root: {
                borderRadius: 5,
              },
            },
          },
        },
      }),
    [resolved]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiThemeProvider;