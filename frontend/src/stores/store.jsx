import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import themeReducer from "./slices/theme.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
  },
});

export default store