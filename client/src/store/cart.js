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
  },

  extraReducers: {},
});

export const { addToBasket } = cartSlice.actions;

export const cartSelector = (state) => state.cart;
//https://stackoverflow.com/questions/65931557/react-redux-update-item-quantity-more-than-just-one-increment
