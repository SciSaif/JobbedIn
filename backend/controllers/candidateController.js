const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs/dist/bcrypt");
require("dotenv").config();

const User = require("../models/userModel");
const Candidate = require("../models/candidateModel");

// @desc Register a user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  let { name, email, password, mobileNumber, designation } = req.body;

  if (!name || !email || !password || !mobileNumber || !designation) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  email = email.toLowerCase();

  // Check if user already exists
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    mobileNumber,
    designation,
    profilePic: "",
    verified: false,
  });

  if (user) {
    sendVerificationEmail(user, res);
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc Update user details
// @route PUT /api/users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const { name, mobileNumber } = req.body;

  if (!name || !mobileNumber) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const updatedData = await User.findByIdAndUpdate(
    req.user.id,
    { name, mobileNumber },
    {
      new: true, //if not already there then create it
    }
  );

  // @todo remove password form user
  res.status(200).json(updatedData);
});

module.exports = {
  registerUser,

  updateUser,
};
