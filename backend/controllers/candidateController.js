const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs/dist/bcrypt");
require("dotenv").config();

const User = require("../models/userModel");
const Candidate = require("../models/candidateModel");

// @desc get candidate details
// @route GET /api/candidate/:id
// @access public
const getCandidate = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const candidate = await Candidate.findById(id);

  if (!candidate) {
    res.status(401);
    throw new Error("Candidate not found");
  }

  res.status(200).json(candidate);
});

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
  getCandidate,
};
