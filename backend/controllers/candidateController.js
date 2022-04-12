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
  const type = req.body.type;
  const updatedCandidate = null;
  console.log(type);
  if (type === "about") {
    updatedCandidate = await Candidate.findByIdAndUpdate(
      req.user.candidate,
      { about: req.body.data },
      {
        new: true, //if not already there then create it
      }
    );
  } else if (type === "bio") {
    updatedCandidate = await Candidate.findByIdAndUpdate(
      req.user.candidate,
      { bio: req.body.data },
      {
        new: true, //if not already there then create it
      }
    );
  } else if (type === "add") {
    updatedCandidate = await Candidate.findByIdAndUpdate(req.user.candidate, {
      $push: { experience: req.body.data },
    });
  } else if (type === "edit") {
    const item = await Candidate.findById(req.user.candidate);
    const updatedItem = item.experience.map((exp) => {
      if (exp._id == req.body.id) return req.body.data;
      else return exp;
    });

    updatedCandidate = await Candidate.findByIdAndUpdate(
      req.user.candidate,
      {
        experience: updatedItem,
      },
      {
        new: true, //if not already there then create it
      }
    );
  } else if (type === "delete") {
    updatedCandidate = await Candidate.findByIdAndUpdate(
      { _id: req.user.candidate },
      { $pull: { experience: { _id: req.body.data } } }
    );
  }
  res.status(200).json(updatedCandidate);
});

module.exports = {
  updateCandidate,
  getCandidate,
};
