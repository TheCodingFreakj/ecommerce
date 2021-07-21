import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { adminSlice } from "./admin";
import { customerSlice } from "./customer";
import { categorySlice } from "./category";

export const store = configureStore({
  reducer: combineReducers({
    admin: adminSlice.reducer,
    customer: customerSlice.reducer,
    category: categorySlice.reducer,
  }),
  devTools: process.env.NODE_ENV !== "production",
});
