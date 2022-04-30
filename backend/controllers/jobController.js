const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Job = require("../models/jobModel");
const Company = require("../models/companyModel");
const Candidate = require("../models/candidateModel");

// @desc Get jobs by user
// @route GET /api/jobs
// @access Public
const getJobsByUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.headers.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const jobs = await Job.find({ user: req.headers.id });
  res.status(200).json(jobs);
});

// @desc Get a particular job by id
// @route GET /api/jobs/:id
// @access Public
const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id).populate("user");
  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  res.status(200).json(job);
});

// @desc Get a particular job with applicants field populated
// @route GET /api/jobs/:id/applicants
// @access Private
const getJobWithApplicants = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id).populate({
    path: "applicants",
    populate: {
      path: "candidate",
    },
  });
  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  if (job.user.toString() != req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorised");
  }

  res.status(200).json(job);
});

// @desc Create a job by user
// @route POST /api/jobs
// @access Private
const createJob = asyncHandler(async (req, res) => {
  // console.log("p");
  const {
    title,
    workplaceType,
    location = null,
    employmentType,
    description,
    payRange,
    companyID,
  } = req.body;

  if (
    !title ||
    !workplaceType ||
    !employmentType ||
    !description ||
    !companyID
  ) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  //get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //get company using the id in the JWT
  const company = await Company.findById(companyID);

  if (!company) {
    res.status(401);
    throw new Error("Company not found");
  }

  const job = await Job.create({
    user,
    title,
    workplaceType,
    location,
    employmentType,
    description,
    payRange,
    companyID,
    numberOfApplicants: 0,
    applicants: [],
  });

  if (job) {
    res.status(201).json({
      _id: job.id,
      user,
      title: job.title,
      workplaceType: job.workplaceType,
      location: job.location,
      employmentType: job.employmentType,
      description: job.description,
      payRange: job.payRange,
      companyID,
      numberOfApplicants: job.numberOfApplicants,
      applicants: [],
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc Delete job
// @route DELETE /api/jobs/:id
// @access Private
const deleteJob = asyncHandler(async (req, res) => {
  //get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  if (job.user.toString() != req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  await job.remove();

  res.status(200).json({ success: true });
});

// @desc update job
// @route PUT /api/jobs/:id
// @access Private
const updateJob = asyncHandler(async (req, res) => {
  //get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  if (job.user.toString() != req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  // console.log(req.body);
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true, //if not already there then create it
  });

  // console.log("updated", updatedJob);

  res.status(200).json(updatedJob);
});

// @desc Get  All Jobs
// @route GET /api/jobs/all
// @access Public
const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({});

  // console.log("job: ", job);

  if (!jobs) {
    // console.log("e");
    res.status(404);
    throw new Error("No jobs not found");
  }

  res.status(200).json(jobs);
});

// @desc Apply to job
// @route PUT /api/jobs/:id/apply
// @access private
const applyJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  // make sure that candidate exists
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  }
  if (user.designation !== "candidate") {
    res.status(404);
    throw new Error("User is not a candidate");
  }

  // check if already applied
  const candidate = await Candidate.findById(req.user.candidate);

  if (!candidate) {
    res.status(404);
    throw new Error("Candidate not found");
  }

  if (candidate.applications.filter((e) => e == req.params.id).length !== 0) {
    // already applied to job
    res.status(400);
    throw new Error("Already applied to job");
  }
  let updatedJob;

  try {
    updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { $push: { applicants: user._id }, $inc: { numberOfApplicants: 1 } },
      {
        new: true, //if not already there then create it
      }
    );
  } catch (error) {
    console.log(error);
  }

  const updatedCandidate = await Candidate.findByIdAndUpdate(
    candidate._id,
    {
      $push: { applications: job._id },
    },
    {
      new: true, //if not already there then create it
    }
  );

  res.status(200).json(updatedJob);
});

module.exports = {
  getJobsByUser,
  createJob,
  getJobById,
  deleteJob,
  updateJob,
  getAllJobs,
  applyJob,
  getJobWithApplicants,
};
