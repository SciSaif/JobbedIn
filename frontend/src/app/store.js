import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"; //this line
import jobsReducer from "../features/jobs/jobsSlice"; //this line

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
  },
});
