import axios from "axios";

const API_URL = "/api/jobs/";

// Get jobs by employer
const getJobs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Create a job
const createJob = async (jobData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, jobData, config);
  return response.data;
};

// // Delete job by employer
// const deleteJob = async (token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const response = await axios.delete(API_URL, config);
// };

const jobsService = {
  getJobs,
  createJob,
};

export default jobsService;
