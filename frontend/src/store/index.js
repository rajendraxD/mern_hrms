import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import themeReducer from "./slices/themeSlice";
import { injectStore } from "../api/axios";

const store = configureStore({
  reducer: { user: userReducer, theme: themeReducer },
});

injectStore(store);

export default store;
