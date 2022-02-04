const asyncHandler = require("express-async-handler");
const brcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Employer = require("../models/employerModel");
const bcrypt = require("bcryptjs/dist/bcrypt");

// @desc Register an employer
// @route /api/employers
// @access Public
const registerEmployer = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    mobileNumber,
    companyName,
    address,
    description,
  } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !mobileNumber ||
    !companyName ||
    !address ||
    !description
  ) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // Check if employer already exists
  const employerExists = await Employer.findOne({ email: email });

  if (employerExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create Employer
  const employer = await Employer.create({
    name,
    email,
    password: hashedPassword,
    mobileNumber,
    companyName,
    address,
    description,
  });

  if (employer) {
    res.status(201).json({
      _id: employer._id,
      name: employer.name,
      email: employer.email,
      mobileNumber: employer.mobileNumber,
      companyName: employer.companyName,
      address: employer.address,
      description: employer.description,
      token: generateToken(employer._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Employer Data");
  }
});

// @desc Login an employer
// @route /api/employers/login
// @access Public
const loginEmployer = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  const employer = await Employer.findOne({ email });

  // check if employer exists and match password
  if (employer && (await bcrypt.compare(password, employer.password))) {
    res.status(200).json({
      _id: employer.id,
      name: employer.name,
      email: employer.email,
      mobileNumber: employer.mobileNumber,
      companyName: employer.companyName,
      address: employer.address,
      description: employer.description,
      token: generateToken(employer._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

// @desc Get current employer
// @route /api/employers/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  const employer = {
    id: req.employer._id,
    email: req.employer.email,
    name: req.employer.name,
    mobileNumber: req.employer.mobileNumber,
    companyName: req.employer.companyName,
    address: req.employer.address,
    description: req.employer.mobileNumber,
  };
  res.status(200).json(employer);
});

//Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerEmployer,
  loginEmployer,
  getMe,
};
