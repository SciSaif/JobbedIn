const asyncHandler = require("express-async-handler");

const Employer = require("../models/employerModel");
const Job = require("../models/jobModel");

// @desc Get jobs by employer
// @route GET /api/jobs
// @access Private
const getJobsByEmployer = asyncHandler(async (req, res) => {
  //get employer using the id in the JWT
  console.log("e3");

  const employer = await Employer.findById(req.employer.id);

  if (!employer) {
    res.status(401);
    throw new Error("Employer not found");
  }

  const jobs = await Job.find({ employer: req.employer.id });
  res.status(200).json(jobs);
});

// @desc Get a particular job by employer
// @route GET /api/jobs/:id
// @access Private
const getJobByEmployer = asyncHandler(async (req, res) => {
  //get employer using the id in the JWT
  const employer = await Employer.findById(req.employer.id);

  if (!employer) {
    res.status(401);
    throw new Error("Employer not found");
  }

  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  if (job.employer.toString() != req.employer.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  res.status(200).json(job);
});

// @desc Create a job by employer
// @route POST /api/jobs
// @access Private
const createJob = asyncHandler(async (req, res) => {
  const {
    title,
    workplaceType,
    location = null,
    employmentType,
    description,
    payRange = null,
  } = req.body;

  console.log(payRange);

  if (!title || !workplaceType || !employmentType || !description) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  //get employer using the id in the JWT
  const employer = await Employer.findById(req.employer.id);

  if (!employer) {
    res.status(401);
    throw new Error("Employer not found");
  }

  const job = await Job.create({
    employer,
    title,
    workplaceType,
    location,
    employmentType,
    description,
    payRange,
    applicants: 0,
  });

  if (job) {
    res.status(201).json({
      _id: job.id,
      employer,
      title: job.title,
      workplaceType: job.workplaceType,
      location: job.location,
      employmentType: job.employmentType,
      description: job.description,
      payRange: job.payRange,
      applicants: job.applicants,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Employer Data");
  }
});

// @desc Delete job
// @route DELETE /api/jobs/:id
// @access Private
const deleteJob = asyncHandler(async (req, res) => {
  //get employer using the id in the JWT
  const employer = await Employer.findById(req.employer.id);

  if (!employer) {
    res.status(401);
    throw new Error("Employer not found");
  }

  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  if (job.employer.toString() != req.employer.id) {
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
  //get employer using the id in the JWT
  const employer = await Employer.findById(req.employer.id);

  if (!employer) {
    res.status(401);
    throw new Error("Employer not found");
  }

  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  if (job.employer.toString() != req.employer.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  console.log(req.body);
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true, //if not already there then create it
  });

  console.log("updated", updatedJob);

  res.status(200).json(updatedJob);
});

module.exports = {
  getJobsByEmployer,
  createJob,
  getJobByEmployer,
  deleteJob,
  updateJob,
};
