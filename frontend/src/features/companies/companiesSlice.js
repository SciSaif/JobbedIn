import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import companiesService from "./companiesService";

const initialState = {
  companies: [],
  company: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  onAction: "",
};

function validateURL(url) {
  if (
    !(url.substring(0, 8) === "https://" || url.substring(0, 7) === "http://")
  ) {
    url = "https://" + url;
    return url;
  } else {
    return url;
  }
}

// Add a company
export const addCompany = createAsyncThunk(
  "companies/addCompany",
  async (companyData, thunkAPI) => {
    try {
      const { website } = companyData;
      if (website) {
        let newLink = validateURL(website);
        companyData = { ...companyData, website: newLink };
      }
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

// Get all companies
export const getAllCompanies = createAsyncThunk(
  "companies/getAllCompanies",
  async (thunkAPI) => {
    try {
      return await companiesService.getAllCompanies();
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

// Delete a particular company
export const deleteCompany = createAsyncThunk(
  "companies/deleteCompany",
  async (companyId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await companiesService.deleteCompany(companyId, token);
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

// Edit a particular company
export const editCompany = createAsyncThunk(
  "companies/editCompany",
  async (companyDataWithId, thunkAPI) => {
    try {
      const companyId = companyDataWithId.id;
      const companyData = companyDataWithId.formData;
      const token = thunkAPI.getState().auth.user.token;
      return await companiesService.editCompany(companyId, companyData, token);
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

// update company logo
export const updateCompanyLogo = createAsyncThunk(
  "companies/updateCompanyLogo",
  async (companyDataWithId, thunkAPI) => {
    try {
      const companyId = companyDataWithId.id;
      const logo = companyDataWithId.previewSource;
      const token = thunkAPI.getState().auth.user.token;
      return await companiesService.updateCompanyLogo(companyId, logo, token);
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
      state.onAction = "";
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
        state.onAction = "getCompany";
      })
      .addCase(getCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.company = action.payload;
        state.onAction = "getCompany";
      })
      .addCase(getCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.onAction = "getCompany";
      })
      .addCase(addCompany.pending, (state) => {
        state.isLoading = true;
        state.onAction = "addCompany";
      })
      .addCase(addCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.company = action.payload;
        state.onAction = "addCompany";
      })
      .addCase(addCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.onAction = "addCompany";
      })
      .addCase(getCompanies.pending, (state) => {
        state.isLoading = true;
        state.onAction = "getCompanies";
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.companies = action.payload;
        state.onAction = "getCompanies";
      })
      .addCase(getCompanies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.onAction = "getCompanies";
      })
      .addCase(deleteCompany.pending, (state) => {
        state.isLoading = true;
        state.onAction = "delete";
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.companies = state.companies.filter(
          (company) => company._id !== action.payload.companyId
        );
        state.onAction = "delete";
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.onAction = "delete";
      })
      .addCase(editCompany.pending, (state) => {
        state.isLoading = true;
        state.onAction = "edit";
      })
      .addCase(editCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.company = action.payload;
        state.onAction = "edit";
      })
      .addCase(editCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.onAction = "edit";
      })
      .addCase(getAllCompanies.pending, (state) => {
        state.isLoading = true;
        state.onAction = "getAll";
      })
      .addCase(getAllCompanies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.companies = action.payload;
        state.onAction = "getAll";
      })
      .addCase(getAllCompanies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.onAction = "getAll";
      })
      .addCase(updateCompanyLogo.pending, (state) => {
        state.isLoading = true;
        state.onAction = "editLogo";
      })
      .addCase(updateCompanyLogo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.company = action.payload;
        state.onAction = "editLogo";
      })
      .addCase(updateCompanyLogo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.onAction = "editLogo";
      });
  },
});

export const { reset, emptyCompany, emptyCompanies } = companiesSlice.actions;
export default companiesSlice.reducer;
