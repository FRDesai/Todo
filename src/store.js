import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./taskslice";

export const store = configureStore({
  reducer: {
    todo: todoSlice,
  },
});
