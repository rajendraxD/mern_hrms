import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/slices/userSlice";
import themeModeReducer from "../store/slices/themeModeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeModeReducer,
  },
});

export default store;
