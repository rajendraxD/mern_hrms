import { createTheme } from "@mui/material/styles";

const shared = {
  typography: {
    fontFamily: '"Outfit", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
  },
};

const lightPalette = {
  mode: "light",
  primary: { main: "#4f46e5", light: "#818cf8", dark: "#3730a3" },
  secondary: { main: "#0ea5e9", light: "#38bdf8", dark: "#0284c7" },
  background: {
    default: "#f4f6fb",
    paper: "#ffffff",
  },
  text: {
    primary: "#1e293b",
    secondary: "#64748b",
  },
  divider: "rgba(0, 0, 0, 0.08)",
};

const darkPalette = {
  mode: "dark",
  primary: { main: "#818cf8", light: "#a5b4fc", dark: "#4f46e5" },
  secondary: { main: "#38bdf8", light: "#7dd3fc", dark: "#0ea5e9" },
  background: {
    default: "#0f1117",
    paper: "#1a1d2e",
  },
  text: {
    primary: "#f1f5f9",
    secondary: "#94a3b8",
  },
  divider: "rgba(255, 255, 255, 0.08)",
};

export function buildTheme(mode) {
  const palette = mode === "dark" ? darkPalette : lightPalette;

  return createTheme({
    ...shared,
    palette,
    shadows: [
      "none",
      "0 1px 3px rgba(0,0,0,0.08)",
      "0 1px 5px rgba(0,0,0,0.08)",
      "0 2px 8px rgba(0,0,0,0.1)",
      "0 4px 12px rgba(0,0,0,0.1)",
      "0 6px 16px rgba(0,0,0,0.1)",
      ...Array(19).fill(
        mode === "dark"
          ? "0 8px 24px rgba(0,0,0,0.4)"
          : "0 8px 24px rgba(0,0,0,0.12)",
      ),
    ],
  });
}
