import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./regSlice";
import movieReducer from "./movieSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    movieSlice:movieReducer
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables the warning
    }),
});



