import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initiaState = {
  employer: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const registerEmployer = createAsyncThunk(
  "auth/registerEmployer",
  async (user, thunkAPI) => {
    console.log(user);
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initiaState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default authSlice.reducer;
