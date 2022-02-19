import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employerService from "./employerService";

const initialState = {
  employer: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getEmployerById = createAsyncThunk(
  "employer/getEmployerById",
  async (id, thunkAPI) => {
    try {
      return await employerService.getEmployerById(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update employer details
export const updateEmployer = createAsyncThunk(
  "employer/update",
  async (newData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.employer.token;
      return await employerService.updateEmployer(newData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete employer account
export const deleteEmployer = createAsyncThunk(
  "employer/delete",
  async (password, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.employer.token;
      return await employerService.deleteEmployer(token, password);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// change password
export const changePassword = createAsyncThunk(
  "employer/changePassword",
  async ({ oldPassword, newPassword }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.employer.token;
      return await employerService.changePassword(
        token,
        oldPassword,
        newPassword
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const employerSlice = createSlice({
  name: "employer",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    emptyEmployer: (state) => {
      state.employer = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployerById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmployerById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employer = action.payload;
      })
      .addCase(getEmployerById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateEmployer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEmployer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employer = action.payload;
      })
      .addCase(updateEmployer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteEmployer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEmployer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employer = {};
        state.message = action.payload;
      })
      .addCase(deleteEmployer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, emptyEmployer } = employerSlice.actions;
export default employerSlice.reducer;
