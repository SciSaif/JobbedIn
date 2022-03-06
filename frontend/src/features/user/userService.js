import axios from "axios";

const API_URL = "/api/users/";

const getUserById = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// Update User details
const updateUser = async (newData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL, newData, config);

  return response.data;
};

//Delete User
const deleteUser = async (token, password) => {
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

//update user profile pic
const updateProfilePic = async (id, profilePic, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + id + "/updateProfilePic",
    { profilePic },
    config
  );

  return response.data;
};

const userService = {
  getUserById,
  updateUser,
  deleteUser,
  changePassword,
  updateProfilePic,
};

export default userService;
