import axios from "axios";

const API_URL = "/api/users/";

// Register user
const registerUser = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const loginUser = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logoutUser = () => {
  localStorage.removeItem("user");
};

const authService = { registerUser, loginUser, logoutUser };

export default authService;
