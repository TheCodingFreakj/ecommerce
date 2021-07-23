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

export const showproduct = createAsyncThunk(
  "product/showproduct",
  async ({ prod_id, stateadmin }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `http://localhost:8080/api/v1/viewproduct/${prod_id}`,

        headers: {
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

export const updateproduct = createAsyncThunk(
  "product/updateproduct",
  async ({ data, prod_id, stateadmin }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios({
        method: "PUT",
        url: `http://localhost:8080/api/v1/update/${prod_id}`,
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

export const deleteproduct = createAsyncThunk(
  "product/deleteproduct",
  async ({ id, stateadmin }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `http://localhost:8080/api/v1/deleteproduct/${id}`,

        headers: {
          contentType: "multipart/form-data",
          authorization: ` Bearer ${stateadmin}`,
        },
      });

      console.log(response);

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
    products: "",
    categories: "",
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

    [updateproduct.fulfilled]: (state, action) => {
      console.log("this is action", action);
      state.isFetching = false;
      state.isSuccess = true;
      state.message = action.payload.data.message;

      return state;
    },
    [updateproduct.pending]: (state) => {
      //console.log("this is payload", state);
      state.isFetching = true;
      return state;
    },
    [updateproduct.rejected]: (state, { payload }) => {
      console.log("this is payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.data.message;
      return state;
    },

    [showproduct.fulfilled]: (state, action) => {
      console.log("this is action", action);
      state.isFetching = false;
      state.isSuccess = true;
      state.message = action.payload.data.message;
      state.products = action.payload.data.theProd;
      state.categories = action.payload.data.theProd.Categories;
      return state;
    },
    [showproduct.pending]: (state) => {
      //console.log("this is payload", state);
      state.isFetching = true;
      return state;
    },
    [showproduct.rejected]: (state, { payload }) => {
      //console.log("this is payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.data.message;
      return state;
    },

    [deleteproduct.fulfilled]: (state, action) => {
      console.log("this is action", action);
      state.isFetching = false;
      state.isSuccess = true;
      state.message = action.payload.data.message;

      return state;
    },
    [deleteproduct.pending]: (state) => {
      //console.log("this is payload", state);
      state.isFetching = true;
      return state;
    },
    [deleteproduct.rejected]: (state, { payload }) => {
      console.log("this is payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.data.message;
      return state;
    },
  },
});

export const productSelector = (state) => state.product;
