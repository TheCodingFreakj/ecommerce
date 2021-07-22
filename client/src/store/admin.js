import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupAdmin = createAsyncThunk(
  "admin/signupAdmin",
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

export const loginAdmin = createAsyncThunk(
  "admin/loginAdmin",
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

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
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
    [signupAdmin.fulfilled]: (state, action) => {
      //console.log("this is action", action);
      state.isFetching = false;
      state.isSuccess = true;
      state.message = action.payload.data.message;
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      return state;
    },
    [signupAdmin.pending]: (state) => {
      //console.log("this is payload", state);
      state.isFetching = true;
      return state;
    },
    [signupAdmin.rejected]: (state, { payload }) => {
      //console.log("this is payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.data;
      return state;
    },

    [loginAdmin.fulfilled]: (state, action) => {
      // console.log("this is action", action);
      state.isFetching = false;
      state.isSuccess = true;
      state.message = action.payload.data.message;
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      return state;
    },
    [loginAdmin.pending]: (state) => {
      //console.log("this is payload", state);
      state.isFetching = true;
      return state;
    },
    [loginAdmin.rejected]: (state, { payload }) => {
      //console.log("this is payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.data;
      return state;
    },
  },
});

export const adminSelector = (state) => state.admin;
