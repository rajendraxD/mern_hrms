import { useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMemo } from "react";

const MuiThemeProvider = ({ children }) => {
  const { mode } = useSelector((state) => state.theme);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
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
          //   fontFamily:
          //     "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
          //   h1: {
          //     fontWeight: 700,
          //   },
          //   h2: {
          //     fontWeight: 600,
          //   },
          //   h3: {
          //     fontWeight: 600,
          //   },
          button: {
            textTransform: "none",
            fontWeight: 500,
          },
        },
        shape: {
          borderRadius: 5,
        },
        components: {
            // MuiButton: {
            //   styleOverrides: {
            //     root: {
            //       borderRadius: 8,
            //       padding: "8px 16px",
            //     },
            //   },
            // },
            // MuiCard: {
            //   styleOverrides: {
            //     root: {
            //       borderRadius: 12,
            //       boxShadow:
            //         mode === "light"
            //           ? "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
            //           : "0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)",
            //     },
            //   },
            // },
          //   MuiPaper: {
          //     styleOverrides: {
          //       root: {
          //         backgroundImage: "none",
          //       },
          //     },
          //   },
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
    [mode],
  );
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiThemeProvider;
