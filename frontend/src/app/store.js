import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import jobsReducer from "../features/jobs/jobsSlice";
import userReducer from "../features/user/userSlice";
import otherReducer from "../features/other/otherSlice";
import companiesReducer from "../features/companies/companiesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
    user: userReducer,
    other: otherReducer,
    companies: companiesReducer,
  },
});
