import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import candidateService from "./candidateService";

const initialState = {
  candidate: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  onAction: "",
  message: "",
};

// get candidate data
export const getCandidate = createAsyncThunk(
  "candidate/getCandidate",
  async (id, thunkAPI) => {
    try {
      return await candidateService.getCandidate(id);
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
// update candidate data
export const updateCandidate = createAsyncThunk(
  "candidate/updateCandidate",
  async (candidateData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await candidateService.updateCandidate(candidateData, token);
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

export const candidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.onAction = "";
    },
    emptyCandidate: (state) => {
      state.job = [];
    },

    // reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCandidate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCandidate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.onAction = "get candidate";
        state.candidate = action.payload;
      })
      .addCase(getCandidate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.onAction = "get candidate";
        state.message = action.payload;
      })
      .addCase(updateCandidate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCandidate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.onAction = "update candidate";
      })
      .addCase(updateCandidate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.onAction = "update candidate";
      });
  },
});

export const { reset, emptyCandidate } = candidateSlice.actions;
export default candidateSlice.reducer;
