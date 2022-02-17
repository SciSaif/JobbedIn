import axios from "axios";

const API_URL = "/api/employers/";

const getEmployerById = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

const employerService = {
  getEmployerById,
};

export default employerService;
