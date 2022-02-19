import axios from "axios";

const API_URL = "/api/employers/";

const getEmployerById = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// Update Employer details
const updateEmployer = async (newData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL, newData, config);

  return response.data;
};

//Delete Employer
const deleteEmployer = async (token, password) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Password: password,
    },
  };

  const response = await axios.delete(API_URL, config);

  return response.data;
};

//Change password
const changePassword = async (token, oldPassword, newPassword) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + "changePassword",
    { oldPassword, newPassword },
    config
  );

  return response.data;
};

const employerService = {
  getEmployerById,
  updateEmployer,
  deleteEmployer,
  changePassword,
};

export default employerService;
