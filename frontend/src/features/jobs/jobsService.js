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

//Get a particular job
const getJob = async (jobId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log("a", jobId);

  const response = await axios.get(API_URL + jobId, config);
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
  getJob,
};

export default jobsService;
