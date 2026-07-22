import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/slices/userSlice";
import themeReducer from "../store/slices/themeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
  },
});

export default store;
