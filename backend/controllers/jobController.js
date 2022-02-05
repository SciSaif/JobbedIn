const asyncHandler = require("express-async-handler");

const Employer = require("../models/employerModel");
const Job = require("../models/jobModel");

// @desc Get jobs by employer
// @route GET /api/job
// @access Private
const getJob = asyncHandler(async (req, res) => {
  //get employer using the id in the JWT
  const employer = await Employer.findById(req.employer.id);

  if (!employer) {
    res.status(401);
    throw new Error("Employer not found");
  }

  const jobs = await Job.find({ employer: req.employer.id });
  res.status(200).json(jobs);
});

// @desc Create a job by employer
// @route POST /api/job
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

module.exports = {
  getJob,
  createJob,
};
