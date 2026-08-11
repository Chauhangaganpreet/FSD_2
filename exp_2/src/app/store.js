import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/postSlice";
import platformReducer from "../features/platformSlice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    platforms: platformReducer,
  },
});