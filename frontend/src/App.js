import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import EmployerDashboard from "./pages/EmployerDashboard";
import Home from "./pages/Home";
import LoginEmployer from "./pages/LoginEmployer";
import RegisterEmployer from "./pages/RegisterEmployer";
import PrivateRoute from "./components/PrivateRoute,";
import AddJob from "./pages/AddJob";
import Job from "./pages/Job";
import EditJob from "./pages/EditJob";
import Jobs from "./pages/Jobs";

function App() {
  return (
    <Router>
      <div className="sprinkle flex flex-col ">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register-employer" element={<RegisterEmployer />} />
          <Route path="/login-employer" element={<LoginEmployer />} />
          <Route path="/add-job" element={<AddJob />} />
          <Route path="/employer-dashboard" element={<PrivateRoute />}>
            <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          </Route>
          <Route path="/job/:id" element={<Job />} />
          <Route path="/edit-job/:id" element={<EditJob />} />
          <Route path="/jobs/all" element={<Jobs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
