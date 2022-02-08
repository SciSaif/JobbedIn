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

// Create job
export const createJob = createAsyncThunk(
  "jobs/create",
  async (jobData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.employer.token;
      return await jobsService.createJob(jobData, token);
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

// Get a particular job
export const getJob = createAsyncThunk(
  "jobs/getJob",
  async (jobId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.employer.token;
      return await jobsService.getJob(jobId, token);
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

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
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
      })
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.job = action.payload;
      })
      .addCase(getJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = jobsSlice.actions;
export default jobsSlice.reducer;
