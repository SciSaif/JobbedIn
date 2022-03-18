const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs/dist/bcrypt");
require("dotenv").config();

const User = require("../models/userModel");
const Candidate = require("../models/candidateModel");

// @desc Update candidate details
// @route PUT /api/candidate
// @access private
const updateCandidate = asyncHandler(async (req, res) => {
  //update candidate data
  const updatedCandidate = await Candidate.findByIdAndUpdate(
    req.user.candidate,
    req.body,
    {
      new: true, //if not already there then create it
    }
  );
  res.status(200).json(updatedCandidate);
});

module.exports = {
  updateCandidate,
};
