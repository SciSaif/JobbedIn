import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { response } from "express";
import authService from "./authService";

const initiaState = {
  employer: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register new employer
export const registerEmployer = createAsyncThunk(
  "auth/registerEmployer",
  async (employer, thunkAPI) => {
    try {
      return await authService.register(employer);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.data.message) ||
        error.message ||
        error.toString();

      // in builder, for rejected , action payload will carry this message
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login Employer
export const loginEmployer = createAsyncThunk(
  "auth/loginEmployer",
  async (employer, thunkAPI) => {
    console.log(employer);
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initiaState,
  //if we are not dealing with async stuff then we handle them here
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  //since we are dealing with async stuff we need to handle them here
  extraReducers: (builder) => {
    builder
      .addCase(registerEmployer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerEmployer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employer = action.payload;
      })
      .addCase(registerEmployer.rejected, (state, action) => {
        state.isLoading = false;
        state.employer = null;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
