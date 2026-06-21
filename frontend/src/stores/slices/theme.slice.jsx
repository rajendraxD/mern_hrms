import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeMode: localStorage.getItem("themeMode") || "light",
  osPrefersDark:
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const cycle = { light: "dark", dark: "light", system: "light" };
      state.themeMode = cycle[state.themeMode] || "light";
      localStorage.setItem("themeMode", state.themeMode);
    },
    setTheme: (state, action) => {
      state.themeMode = action.payload;
      localStorage.setItem("themeMode", state.themeMode);
    },
    setOsPrefersDark: (state, action) => {
      state.osPrefersDark = action.payload;
    },
  },
});

export const { toggleTheme, setTheme, themeMode, setOsPrefersDark } =
  themeSlice.actions;

export default themeSlice.reducer;
