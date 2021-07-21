import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addcategory = createAsyncThunk(
  "category/addcategory",
  async ({ cat_name, token }, { dispatch, rejectWithValue }) => {
    console.log(token);
    try {
      const response = axios({
        method: "post",
        url: `http://localhost:8080/api/v1/create`,
        cat_name,
        headers: {
          contentType: "application/json",
          authorization: ` Bearer ${token}`,
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

export const deletecategory = createAsyncThunk(
  "category/deletecategory",
  async ({ cat_id }, { dispatch, rejectWithValue }) => {
    try {
      const response = axios({
        method: "post",
        url: `http://localhost:8080/api/v1/delete/:cat_id`,
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

export const categorySlice = createSlice({
  name: "category",
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
    [addcategory.fulfilled]: (state, action) => {
      //console.log("this is action", action);
      state.isFetching = false;
      state.isSuccess = true;
      state.message = action.payload.data.message;

      return state;
    },
    [addcategory.pending]: (state) => {
      //console.log("this is payload", state);
      state.isFetching = true;
      return state;
    },
    [addcategory.rejected]: (state, { payload }) => {
      // console.log("this is payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.data;
      return state;
    },

    [deletecategory.fulfilled]: (state, action) => {
      //console.log("this is action", action);
      state.isFetching = false;
      state.isSuccess = true;
      state.message = action.payload.data.message;

      return state;
    },
    [deletecategory.pending]: (state) => {
      //console.log("this is payload", state);
      state.isFetching = true;
      return state;
    },
    [deletecategory.rejected]: (state, { payload }) => {
      // console.log("this is payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.data;
      return state;
    },
  },
});

export const categorySelector = (state) => state.category;
