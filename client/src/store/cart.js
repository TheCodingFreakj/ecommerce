import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToBasket: (state, { payload }) => {
      console.log(payload);
      const item = state.items.find((product) => product.id === payload.id);

      if (item) {
        state = state.items.map((product) =>
          product.id === payload.id
            ? {
                ...product,
                quantity: product.quant + payload.quant,
              }
            : product
        );
      } else {
        state.items.push(payload);
      }
    },

    removeitem: (state, { payload }) => {
      console.log(payload);
      state.items = state.items.filter((item) => item.id !== payload.id);
    },
  },

  extraReducers: {},
});

export const { addToBasket, removeitem } = cartSlice.actions;

export const cartSelector = (state) => state.cart;
//https://stackoverflow.com/questions/65931557/react-redux-update-item-quantity-more-than-just-one-increment
//https://webmobtuts.com/frontend-development/building-shopping-cart-with-reactjs-and-redux-part-2/