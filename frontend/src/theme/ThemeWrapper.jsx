import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getTheme } from "./theme";

/**
 * Syncs MUI theme palette tokens to CSS custom properties on :root
 * so Tailwind utility classes (e.g. bg-primary-main, text-text-primary)
 * stay in sync with the active MUI theme (light / dark / auto).
 */
function ThemeSync() {
  const theme = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    const { palette } = theme;

    const vars = {
      "--color-primary-main": palette.primary.main,
      "--color-primary-light": palette.primary.light,
      "--color-primary-dark": palette.primary.dark,

      "--color-secondary-main": palette.secondary.main,
      "--color-secondary-light": palette.secondary.light,
      "--color-secondary-dark": palette.secondary.dark,

      "--color-background-default": palette.background.default,
      "--color-background-paper": palette.background.paper,

      "--color-text-primary": palette.text.primary,
      "--color-text-secondary": palette.text.secondary,

      "--color-divider":
        palette.divider ||
        (palette.mode === "dark"
          ? "rgba(255,255,255,0.12)"
          : "rgba(0,0,0,0.12)"),

      "--color-error": palette.error?.main || "#d32f2f",
      "--color-success": palette.success?.main || "#2e7d32",
      "--color-warning": palette.warning?.main || "#ed6c02",
      "--color-info": palette.info?.main || "#0288d1",
    };

    Object.entries(vars).forEach(([key, val]) => {
      root.style.setProperty(key, val);
    });
  }, [theme]);

  return null;
}

export default function ThemeWrapper({ children }) {
  const { mode } = useSelector((state) => state.theme);
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  const resolvedMode = useMemo(() => {
    if (mode === "auto") return prefersDark ? "dark" : "light";
    return mode;
  }, [mode, prefersDark]);

  const theme = useMemo(() => getTheme(resolvedMode), [resolvedMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeSync />
      {children}
    </ThemeProvider>
  );
}
