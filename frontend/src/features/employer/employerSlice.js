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
      });
  },
});

export const { reset, emptyEmployer } = employerSlice.actions;
export default employerSlice.reducer;
