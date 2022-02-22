import axios from "axios";
const API_URL = "/api/";

const resetPassword = async (email) => {
  let currentUrl;
  if (process.env.NODE_ENV === "development") {
    currentUrl = "http://localhost:3000/";
  } else {
    currentUrl = "https://jobbedin.herokuapp.com/";
  }
  const response = await axios.post(API_URL + "passwordReset", {
    email,
    redirectUrl: `${currentUrl}set-new-password`,
  });

  return response.data;
};

const executeResetPassword = async (userId, resetString, newPassword) => {
  const response = await axios.post(API_URL + "executeResetPassword", {
    userId,
    resetString,
    newPassword,
  });

  return response.data;
};

const otherService = { resetPassword, executeResetPassword };

export default otherService;
