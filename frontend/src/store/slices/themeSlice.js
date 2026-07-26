import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "hrms-theme";

function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getInitialMode() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch {
    // localStorage unavailable
  }
  return "system";
}

function resolveMode(mode) {
  return mode === "system" ? getSystemTheme() : mode;
}

const initialMode = getInitialMode();

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: initialMode,
    resolved: resolveMode(initialMode),
  },
  reducers: {
    setMode: (state, action) => {
      const mode = action.payload;
      state.mode = mode;
      state.resolved = resolveMode(mode);
      try {
        localStorage.setItem(STORAGE_KEY, mode);
      } catch {
        // ignore
      }
    },
    syncSystemTheme: (state) => {
      if (state.mode === "system") {
        state.resolved = getSystemTheme();
      }
    },
  },
});

export const { setMode, syncSystemTheme } = themeSlice.actions;
export default themeSlice.reducer;
