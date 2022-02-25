import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import companiesService from "./companiesService";

const initialState = {
  companies: [],
  company: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Add a company
export const addCompany = createAsyncThunk(
  "companies/addCompany",
  async (companyData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await companiesService.addCompany(companyData, token);
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

// Get a particular company by id
export const getCompany = createAsyncThunk(
  "companies/getCompany",
  async (companyId, thunkAPI) => {
    try {
      return await companiesService.getCompany(companyId);
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

// Get Companies by user id
export const getCompanies = createAsyncThunk(
  "companies/getCompanies",
  async (id, thunkAPI) => {
    try {
      return await companiesService.getCompanies(id);
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

export const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    emptyCompany: (state) => {
      state.company = [];
    },
    emptyCompanies: (state) => {
      state.companies = [];
    },
    // reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.company = action.payload;
      })
      .addCase(getCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.company = action.payload;
      })
      .addCase(addCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCompanies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.companies = action.payload;
      })
      .addCase(getCompanies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, emptyCompany, emptyCompanies } = companiesSlice.actions;
export default companiesSlice.reducer;
