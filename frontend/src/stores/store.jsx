import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/theme.slice";
import userReducer from "./slices/user.slice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
  },
});

export default store