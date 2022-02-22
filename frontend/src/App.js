import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import EmployerDashboard from "./pages/Employer";
import Home from "./pages/Home";
import LoginEmployer from "./pages/LoginEmployer";
import RegisterEmployer from "./pages/RegisterEmployer";
import PrivateRoute from "./components/PrivateRoute,";
import AddJob from "./pages/AddJob";
import Job from "./pages/Job";
import EditJob from "./pages/EditJob";
import Jobs from "./pages/Jobs";
import Employer from "./pages/Employer";
import EditEmployer from "./pages/EditEmployer";
import EmailSent from "./pages/EmailSent";
import { SnackbarProvider } from "notistack";
import ForgotPassword from "./pages/ForgotPassword";
import SetNewPassword from "./pages/SetNewPassword";

function App() {
  return (
    <Router>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="sprinkle flex flex-col ">
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register-employer" element={<RegisterEmployer />} />
            <Route path="/emailsent/:userEmail" element={<EmailSent />} />
            <Route
              path="/login-employer/:userEmail"
              element={<LoginEmployer />}
            />
            <Route path="/login-employer" element={<LoginEmployer />} />
            <Route path="/add-job" element={<AddJob />} />
            <Route path="/employer/:id" element={<Employer />} />
            <Route path="/employer/edit" element={<PrivateRoute />}>
              <Route path="/employer/edit" element={<EditEmployer />} />
            </Route>
            <Route path="/edit-job/:id" element={<PrivateRoute />}>
              <Route path="/edit-job/:id" element={<EditJob />} />
            </Route>
            <Route path="/job/:id" element={<Job />} />
            <Route path="/jobs/all" element={<Jobs />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/set-new-password/:id/:resetString"
              element={<SetNewPassword />}
            />
          </Routes>
        </div>
      </SnackbarProvider>
    </Router>
  );
}

export default App;
