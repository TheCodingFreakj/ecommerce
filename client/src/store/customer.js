import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupCustomer = createAsyncThunk(
  "customer/signupCustomer",
  async (
    { email, password, username, role },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = axios({
        method: "post",
        url: `http://localhost:8080/api/v1/add_new_user`,
        data: {
          email: email,
          password: password,
          role: role,
          username: username,
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

export const loginCustomer = createAsyncThunk(
  "customer/loginCustomer",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = axios({
        method: "post",
        url: `http://localhost:8080/api/v1/login`,
        data: {
          email: email,
          password: password,
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

export const customerSlice = createSlice({
  name: "customer",
  initialState: {
    email: "",
    password: "",
    username: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    message: "",
    user: "",
    token: "",
  },
  reducers: {
    // Reducer comes here
  },

  extraReducers: {
    [signupCustomer.fulfilled]: (state, action) => {
      //console.log("this is action", action);
      state.isFetching = false;
      state.isSuccess = true;
      state.message = action.payload.data.message;
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      return state;
    },
    [signupCustomer.pending]: (state) => {
      //console.log("this is payload", state);
      state.isFetching = true;
      return state;
    },
    [signupCustomer.rejected]: (state, { payload }) => {
      // console.log("this is payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.data;
      return state;
    },
  },

  [loginCustomer.fulfilled]: (state, action) => {
    // console.log("this is action", action);
    state.isFetching = false;
    state.isSuccess = true;
    state.user = action.payload.data.user;
    state.token = action.payload.data.token;
    return state;
  },
  [loginCustomer.pending]: (state) => {
    // console.log("this is payload", state);
    state.isFetching = true;
    return state;
  },
  [loginCustomer.rejected]: (state, { payload }) => {
    //console.log("this is payload", payload);
    state.isFetching = false;
    state.isError = true;
    state.errorMessage = payload.data;
    return state;
  },
});

export const customerSelector = (state) => state.customer;
