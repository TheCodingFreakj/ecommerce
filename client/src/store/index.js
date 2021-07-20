import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { adminSlice } from "./admin";

export const store = configureStore({
  reducer: combineReducers({
    admin: adminSlice.reducer,
  }),
  devTools: process.env.NODE_ENV !== "production",
});
