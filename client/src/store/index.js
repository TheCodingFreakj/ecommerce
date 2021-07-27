import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { adminSlice } from "./admin";
import { customerSlice } from "./customer";
import { categorySlice } from "./category";
import { productSlice } from "./product";

import { singleProductSlice } from "./shopping";
export const store = configureStore({
  reducer: combineReducers({
    admin: adminSlice.reducer,
    customer: customerSlice.reducer,
    category: categorySlice.reducer,
    product: productSlice.reducer,
    singleproduct: singleProductSlice.reducer,
  }),
  devTools: process.env.NODE_ENV !== "production",
});
