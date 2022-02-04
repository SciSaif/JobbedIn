import axios from "axios";

const API_URL = "/api/employers/";

// Register employer
const registerEmployer = async (employerData) => {
  const response = await axios.post(API_URL, employerData);

  if (response.data) {
    localStorage.setItem("employer", JSON.stringify(response.data));
  }

  return response.data;
};

// Login employer
const loginEmployer = async (employerData) => {
  const response = await axios.post(API_URL + "login", employerData);
  if (response.data) {
    localStorage.setItem("employer", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout employer
const logoutEmployer = () => {
  localStorage.removeItem("employer");
};

const authService = { registerEmployer, loginEmployer, logoutEmployer };

export default authService;
