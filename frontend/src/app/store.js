import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import jobsReducer from "../features/jobs/jobsSlice";
import employerReducer from "../features/employer/employerSlice";
import otherReducer from "../features/other/otherSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
    employer: employerReducer,
    other: otherReducer,
  },
});
