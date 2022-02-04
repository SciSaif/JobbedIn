import axios from "axios";

const API_URL = "/api/employers";

// Register user
const register = async (employerData) => {
  const response = await axios.post(API_URL, employerData);

  if (response.data) {
    localStorage.setItem("employer", JSON.stringify(response.data));
  }

  return response.data;
};

const authService = { register };

export default authService;
