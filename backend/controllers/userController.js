const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");
require("dotenv").config();

const User = require("../models/userModel");
const Job = require("../models/jobModel");
const Company = require("../models/companyModel");
const Candidate = require("../models/candidateModel");

const { cloudinary } = require("../utils/cloudinary");

const { sendVerificationEmail } = require("./verifyEmailController");

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

  let candidate;
  if (designation === "candidate") {
    candidate = await Candidate.create({
      name,
      email,
      mobileNumber,
      bio: "",
      about: "",
      experience: [],
      education: [],
      skills: [],
    });
  }

  if (!candidate) {
    res.status(400);
    throw new Error("Invalid candidate data");
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
    candidate: candidate._id,
    verified: false,
  });

  if (user) {
    sendVerificationEmail(user, res);
  } else {
    await candidate.remove();
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc Login an user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  email = email.toLowerCase();

  const user = await User.findOne({ email }).populate("candidate");
  console.log(user);

  if (user && !user.verified) {
    res.status(400);
    throw new Error("Email is not verified yet. Check your inbox.");
  }

  // check if user exists and match password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      mobileNumber: user.mobileNumber,
      designation: user.designation,
      profilePic: user.profilePic,
      candidate: user.candidate,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

// @desc Get current user
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    mobileNumber: req.user.mobileNumber,
    designation: req.user.designation,
  };

  res.status(200).json(user);
});

// @desc Get user details by id
// @route GET /api/users/:id
// @access Public
const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("candidate");

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // @todo remove password form user
  res.status(200).json(user);
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

// @desc Delete user account
// @route DELETE /api/users/
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  //get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // check if user exists and match password
  if (await bcrypt.compare(req.headers.password, user.password)) {
    await Job.deleteMany({ user: user._id });
    await Company.deleteMany({ postedBy: user._id });
    if (user.designation === "candidate") {
      await Candidate.findByIdAndDelete(user.candidate);
    }
    await user.remove();
    res.status(200).json({ success: true, type: "deleteUser" });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

// @desc Change password
// @route PUT /api/users/changePassword
// @access Private
const changePassword = asyncHandler(async (req, res) => {
  //get user using the id in the JWT
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // check if user exists and match password
  if (await bcrypt.compare(req.body.oldPassword, user.password)) {
    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

    await User.findByIdAndUpdate(
      req.user.id,
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

// @desc update profile pic
// @route PUT /api/users/:id/updateProfilePic
// @access Private
const updateProfilePic = asyncHandler(async (req, res) => {
  //get user using the id in the JWT
  const user = await User.findById(req.user._id);
  let profilePic = req.body.profilePic;

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (profilePic === "") {
    //delete previous profilePic
    if (user.profilePic) {
      await cloudinary.uploader.destroy(user.profilePic);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { profilePic: "" },
      {
        new: true, //if not already there then create it
      }
    );
    res.status(200).json(updatedUser);
  }

  // add profilePic to cloudinary
  const fileStr = profilePic;
  const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
    upload_preset: "JobbedIn_user",
  });

  if (uploadedResponse && uploadedResponse.public_id) {
    profilePic = uploadedResponse.public_id;
  } else {
    req.statusCode(400);
    throw new Error("Failed to upload profile pic");
  }

  // delete previous profile pic
  if (user.profilePic) {
    await cloudinary.uploader.destroy(user.profilePic);
  }
  const updatedProfilePic = await User.findByIdAndUpdate(
    req.params.id,
    { profilePic: profilePic },
    {
      new: true, //if not already there then create it
    }
  );

  res.status(200).json(updatedProfilePic);
});

//Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUserById,
  updateUser,
  deleteUser,
  changePassword,
  updateProfilePic,
};
