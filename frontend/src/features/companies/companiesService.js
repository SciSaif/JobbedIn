import axios from "axios";

const API_URL = "/api/company/";

// Add a company
const addCompany = async (companyData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, companyData, config);
  return response.data;
};

//Get a particular company
const getCompany = async (companyId, token) => {
  const response = await axios.get(API_URL + companyId);
  return response.data;
};

// Get companies by user id
const getCompanies = async (id) => {
  const config = {
    headers: {
      id: id,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get all companies
const getAllCompanies = async (id) => {
  const response = await axios.get(API_URL + "all");

  return response.data;
};

// Delete a company
const deleteCompany = async (companyId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + companyId, config);
  if (
    response &&
    response.data &&
    response.data.success &&
    response.data.success === true
  ) {
    return { companyId };
  }
  return response.data;
};

// Edit a company
const editCompany = async (companyId, companyData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + companyId, companyData, config);

  if (
    response &&
    response.data &&
    response.data.success &&
    response.data.success === true
  ) {
    return { companyId };
  }
  return response.data;
};

const companiesService = {
  getCompany,
  addCompany,
  getCompanies,
  deleteCompany,
  editCompany,
  getAllCompanies,
};
export default companiesService;
