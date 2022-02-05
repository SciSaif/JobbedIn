import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jobsService from "./jobsService";

const initialState = {
  jobs: [],
  job: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get jobs by employer
export const getJobs = createAsyncThunk("jobs/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.employer.token;
    return await jobsService.getJobs(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jobs = action.payload;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = jobsSlice.actions;
export default jobsSlice.reducer;
