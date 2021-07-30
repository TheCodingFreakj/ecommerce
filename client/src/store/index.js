import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { adminSlice } from "./admin";
import { customerSlice } from "./customer";
import { categorySlice } from "./category";
import { productSlice } from "./product";
import { cartSlice } from "./cart";
import { singleProductSlice } from "./shopping";
import storage from "redux-persist/lib/storage";
import { persistStore } from "redux-persist";
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["admin", "category", "product", "singleproduct", "customer"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    admin: adminSlice.reducer,
    customer: customerSlice.reducer,
    category: categorySlice.reducer,
    product: productSlice.reducer,
    singleproduct: singleProductSlice.reducer,
    cart: cartSlice.reducer,
  })
);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
//https://blog.reactnativecoach.com/the-definitive-guide-to-redux-persist-84738167975
