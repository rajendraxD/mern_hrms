import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem("themeMode");
    if (saved && ["light", "dark", "auto"].includes(saved)) return saved;
  } catch {}
  return "light";
};

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: getInitialTheme(),
  },
  reducers: {
    setThemeMode: (state, action) => {
      state.mode = action.payload;
      try {
        localStorage.setItem("themeMode", action.payload);
      } catch {}
    },
  },
});

export const { setThemeMode } = themeSlice.actions;
export default themeSlice.reducer;
