import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/job/Home";
import LoginUser from "./pages/LoginUser";
import RegisterUser from "./pages/RegisterUser";
import PrivateRoute from "./components/PrivateRoute,";
import AddJob from "./pages/job/AddJob";
import Job from "./pages/job/Job";
import EditJob from "./pages/job/EditJob";
import Jobs from "./pages/job/Jobs";
import Employer from "./pages/Employer";
import EditUser from "./pages/EditUser";
import EmailSent from "./pages/EmailSent";
import { SnackbarProvider } from "notistack";
import ForgotPassword from "./pages/ForgotPassword";
import SetNewPassword from "./pages/SetNewPassword";
import AddCompany from "./pages/company/AddCompany";
import Company from "./pages/company/Company";
import EditCompany from "./pages/company/EditCompany";

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
            <Route path="/register-user" element={<RegisterUser />} />
            <Route path="/emailsent/:userEmail" element={<EmailSent />} />
            <Route path="/login-user/:userEmail" element={<LoginUser />} />
            <Route path="/login-user" element={<LoginUser />} />
            <Route path="/add-job" element={<AddJob />} />
            <Route path="/user/:id" element={<Employer />} />
            <Route path="/user/edit" element={<PrivateRoute />}>
              <Route path="/user/edit" element={<EditUser />} />
            </Route>
            <Route path="/edit-job/:id" element={<PrivateRoute />}>
              <Route path="/edit-job/:id" element={<EditJob />} />
            </Route>
            <Route path="/job/:id" element={<Job />} />
            <Route path="/jobs/all" element={<Jobs />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/add-company" element={<AddCompany />} />
            <Route path="/company/:id" element={<Company />} />
            <Route path="/edit-company/:id" element={<PrivateRoute />}>
              <Route path="/edit-company/:id" element={<EditCompany />} />
            </Route>
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
