const asyncHandler = require("express-async-handler");
const brcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");
require("dotenv").config();

const Employer = require("../models/employerModel");
const Job = require("../models/jobModel");

const {
  sendVerificationEmail,
} = require("../controllers/verifyEmailController");

// @desc Register an employer
// @route /api/employers
// @access Public
const registerEmployer = asyncHandler(async (req, res) => {
  let {
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

  email = email.toLowerCase();

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
    verified: false,
  });

  if (employer) {
    sendVerificationEmail(employer, res);
    // res.status(201).json({
    //   // handle account verification
    //   _id: employer._id,
    //   name: employer.name,
    //   email: employer.email,
    //   mobileNumber: employer.mobileNumber,
    //   companyName: employer.companyName,
    //   address: employer.address,
    //   description: employer.description,
    //   token: generateToken(employer._id),
    // });
  } else {
    res.status(400);
    throw new Error("Invalid Employer Data");
  }
});

// @desc Login an employer
// @route /api/employers/login
// @access Public
const loginEmployer = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  email = email.toLowerCase();

  const employer = await Employer.findOne({ email });

  if (employer && !employer.verified) {
    res.status(400);
    throw new Error("Email is not verified yet. Check your inbox.");
  }

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

// @desc Get employer details by id
// @route /api/employers/:id
// @access Public
const getEmployerById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const employer = await Employer.findById(id);

  if (!employer) {
    res.status(401);
    throw new Error("Employer not found");
  }

  // @todo remove password form employer
  res.status(200).json(employer);
});

// @desc Update employer details
// @route /api/employers
// @access Private
const updateEmployer = asyncHandler(async (req, res) => {
  const { name, mobileNumber, companyName, address, description } = req.body;

  if (!name || !mobileNumber || !companyName || !address || !description) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  const employer = await Employer.findById(req.employer.id);

  if (!employer) {
    res.status(401);
    throw new Error("Employer not found");
  }

  const updatedData = await Employer.findByIdAndUpdate(
    req.employer.id,
    { name, mobileNumber, companyName, address, description },
    {
      new: true, //if not already there then create it
    }
  );

  // @todo remove password form employer
  res.status(200).json(updatedData);
});

// @desc Delete employer account
// @route DELETE /api/employers/
// @access Private
const deleteEmployer = asyncHandler(async (req, res) => {
  //get employer using the id in the JWT
  console.log(req.employer);
  const employer = await Employer.findById(req.employer.id);

  if (!employer) {
    res.status(401);
    throw new Error("Employer not found");
  }

  // check if employer exists and match password
  if (await bcrypt.compare(req.headers.password, employer.password)) {
    await Job.deleteMany({ employer: employer._id });
    await employer.remove();
    res.status(200).json({ success: true, type: "deleteEmployer" });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

// @desc Change password
// @route PUT /api/employers/changePassword
// @access Private
const changePassword = asyncHandler(async (req, res) => {
  console.log("reached changePassword");
  //get employer using the id in the JWT
  const employer = await Employer.findById(req.employer._id);

  if (!employer) {
    res.status(401);
    throw new Error("Employer not found");
  }

  // check if employer exists and match password
  if (await bcrypt.compare(req.body.oldPassword, employer.password)) {
    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

    await Employer.findByIdAndUpdate(
      req.employer.id,
      { password: hashedPassword },
      {
        new: true, //if not already there then create it
      }
    );
    res.status(200).json({ success: true, type: "changePassword" });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
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
  getEmployerById,
  updateEmployer,
  deleteEmployer,
  changePassword,
};
