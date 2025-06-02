import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./regSlice";
import movieReducer from "./movieSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    movieSlice:movieReducer
  },
});

console.log(store.getState());

