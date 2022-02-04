import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import LoginEmployer from "./pages/LoginEmployer";
import RegisterEmployer from "./pages/RegisterEmployer";

function App() {
  return (
    <Router>
      <div className="sprinkle flex flex-col ">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register-employer" element={<RegisterEmployer />} />
          <Route path="/login-employer" element={<LoginEmployer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
