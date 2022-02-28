import axios from "axios";

const API_URL = "/api/jobs/";

// Get jobs by user id
const getJobs = async (id) => {
  const config = {
    headers: {
      id: id,
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

  console.log(jobData);

  const response = await axios.post(API_URL, jobData, config);
  return response.data;
};

//Get a particular job
const getJob = async (jobId, token) => {
  const response = await axios.get(API_URL + jobId);
  // console.log(response.data);
  return response.data;
};

// Delete a job
const deleteJob = async (jobId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + jobId, config);
  // console.log(response);
  if (
    response &&
    response.data &&
    response.data.success &&
    response.data.success === true
  ) {
    return { jobId };
  }
  return response.data;
};

// Edit a job
const editJob = async (jobId, jobData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(config);

  const response = await axios.put(API_URL + jobId, jobData, config);

  // console.log(response.data);
  if (
    response &&
    response.data &&
    response.data.success &&
    response.data.success === true
  ) {
    return { jobId };
  }
  return response.data;
};

//Get all Jobs
const getAllJobs = async () => {
  const response = await axios.get(API_URL + "all");

  return response.data;
};

const jobsService = {
  getJobs,
  createJob,
  getJob,
  deleteJob,
  editJob,
  getAllJobs,
};

export default jobsService;
