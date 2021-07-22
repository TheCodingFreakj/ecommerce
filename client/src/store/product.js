import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const addproduct = createAsyncThunk(
  "product/addproduct",
  async ({ data, stateadmin }, { dispatch, rejectWithValue }) => {
    try {
      console.log(stateadmin);

      const response = await axios({
        method: "POST",
        url: `http://localhost:8080/api/v1/createProduct`,
        data,
        headers: {
          contentType: "multipart/form-data",
          authorization: ` Bearer ${stateadmin}`,
        },
      });

      return response; // Return a value synchronously using Async-await
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);
export const productSlice = createSlice({
  name: "product",
  initialState: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    message: "",
  },
  reducers: {
    // Reducer comes here
  },

  extraReducers: {
    [addproduct.fulfilled]: (state, action) => {
      console.log("this is action", action);
      state.isFetching = false;
      state.isSuccess = true;
      state.message = action.payload.data.message;

      return state;
    },
    [addproduct.pending]: (state) => {
      //console.log("this is payload", state);
      state.isFetching = true;
      return state;
    },
    [addproduct.rejected]: (state, { payload }) => {
      console.log("this is payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.data.message;
      return state;
    },
  },
});

export const productSelector = (state) => state.product;
