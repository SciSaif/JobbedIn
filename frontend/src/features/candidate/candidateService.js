import axios from "axios";

const API_URL = "/api/candidate/";

// update candidate
const updateCandidate = async (candidateData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL, candidateData, config);

  // console.log(response.data);
  //   if (
  //     response &&
  //     response.data &&
  //     response.data.success &&
  //     response.data.success === true
  //   ) {
  //     return { };
  //   }
  return response.data;
};

//get candidate details
const getCandidate = async (id) => {
  const response = await axios.get(API_URL + id);

  return response.data;
};

const jobsService = {
  updateCandidate,
  getCandidate,
};

export default jobsService;
