import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToBasket: (state, { payload }) => {
      state.items.push(payload);
    },

    updateCart: (state, { payload }) => {
      // console.log(payload);
      let item = state.items.find((item) => item.id == payload.arr.id);
      item.quant = payload.quant;
    },

    removeitem: (state, { payload }) => {
      console.log(payload);
      state.items = state.items.filter((item) => item.id !== payload.id);
    },
  },

  extraReducers: {},
});

export const { addToBasket, removeitem, updateCart } = cartSlice.actions;

export const cartSelector = (state) => state.cart;
//https://stackoverflow.com/questions/65931557/react-redux-update-item-quantity-more-than-just-one-increment
//https://webmobtuts.com/frontend-development/building-shopping-cart-with-reactjs-and-redux-part-2/
