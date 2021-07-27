import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const singleproduct = createAsyncThunk(
  "product/singleproduct",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:8080/api/v1/getproduct/${id}`,
      });

      //   console.log(response);

      return response; // Return a value synchronously using Async-await
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const relatedproduct = createAsyncThunk(
  "product/relatedproduct",
  async (sold, { dispatch, rejectWithValue }) => {
    console.log(sold);
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:8080/api/v1/getrelated/${sold}`,
      });

      //   console.log(response);

      return response; // Return a value synchronously using Async-await
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const singleProductSlice = createSlice({
  name: "singleproduct",
  initialState: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    message: "",
    product: "",
  },
  reducers: {
    // Reducer comes here
  },

  extraReducers: {
    [singleproduct.fulfilled]: (state, action) => {
      //   console.log("this is action", action);
      state.isFetching = false;
      state.isSuccess = true;
      state.message = action.payload.data.message;
      state.product = action.payload.data.product;
      return state;
    },
    [singleproduct.pending]: (state) => {
      //console.log("this is payload", state);
      state.isFetching = true;
      return state;
    },
    [singleproduct.rejected]: (state, { payload }) => {
      //   console.log("this is payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.data.message;
      return state;
    },

    [relatedproduct.fulfilled]: (state, action) => {
      console.log("this is action", action);
      state.isFetching = false;
      state.isSuccess = true;
      state.message = action.payload.data.message;
      state.product = action.payload.data.product;
      return state;
    },
    [relatedproduct.pending]: (state) => {
      //console.log("this is payload", state);
      state.isFetching = true;
      return state;
    },
    [relatedproduct.rejected]: (state, { payload }) => {
      console.log("this is payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.data.message;
      return state;
    },
  },
});

export const singleproductSelector = (state) => state.singleproduct;
