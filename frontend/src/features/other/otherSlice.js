import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import otherService from "./otherService";

const initiaState = {
  drawerState: "closed",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// request password reset
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (email, thunkAPI) => {
    try {
      return await otherService.resetPassword(email);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      // in builder, for rejected , action payload will carry this message
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// execute reset password
export const executeResetPassword = createAsyncThunk(
  "auth/executeResetPassword",
  async ({ userId, resetString, newPassword }, thunkAPI) => {
    try {
      return await otherService.executeResetPassword(
        userId,
        resetString,
        newPassword
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      // in builder, for rejected , action payload will carry this message
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const otherSlice = createSlice({
  name: "auth",
  initialState: initiaState,
  reducers: {
    toggleDrawer: (state) => {
      state.drawerState = !state.drawerState;
    },
    resetOther: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(executeResetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(executeResetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(executeResetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { toggleDrawer, resetOther } = otherSlice.actions;

export default otherSlice.reducer;
