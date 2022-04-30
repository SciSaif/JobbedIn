const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs/dist/bcrypt");
require("dotenv").config();
const mongoose = require("mongoose");

const User = require("../models/userModel");
const Company = require("../models/companyModel");
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
  let updatedCandidate = null;
  const item = await Candidate.findById(req.user.candidate);

  if (type === "about") {
    console.log(req.user);
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
  } else if (type === "addExperience") {
    // check if this company already exists in experience array
    if (
      item.experience.filter((e) => e.companyName === req.body.data.companyName)
        .length > 0
    ) {
      // already exists, so add to roles
      let updatedExperience = item.experience;
      updatedExperience = updatedExperience.map((e) => {
        if (e.companyName === req.body.data.companyName) {
          let experience = e;
          let roles = e.roles;
          roles.push(req.body.data.role);
          experience.roles = roles;
          return experience;
        } else {
          return e;
        }
      });

      updatedCandidate = await Candidate.findByIdAndUpdate(
        req.user.candidate,
        {
          experience: updatedExperience,
        },
        {
          new: true, //if not already there then create it
        }
      );
    } else {
      // company doesn't exist yet
      // check if company with this name exists in Company collection
      const company = await Company.findOne({
        name: req.body.data.companyName,
      });
      let c = null;
      if (company) {
        // company with this name exists in Company collection
        c = company._id;
      }

      // add a new experience
      let updatedExperience = item.experience;
      updatedExperience.push({
        company: c,
        companyName: req.body.data.companyName,
        roles: [req.body.data.role],
      });

      updatedCandidate = await Candidate.findByIdAndUpdate(
        req.user.candidate,
        {
          experience: updatedExperience,
        },
        {
          new: true, //if not already there then create it
        }
      );
    }
  } else if (type === "editExperience") {
    let updatedExperience = item.experience.map((e) => {
      if (e._id == req.body.data._id) {
        let roles = e.roles.map((e1) => {
          if (e1._id == req.body.data.role._id) {
            return req.body.data.role;
          } else return e1;
        });
        let experience = e;
        experience.roles = roles;
        return experience;
      } else return e;
    });

    updatedCandidate = await Candidate.findByIdAndUpdate(
      req.user.candidate,
      {
        experience: updatedExperience,
      },
      {
        new: true, //if not already there then create it
      }
    );
  } else if (type === "deleteExperience") {
    updatedCandidate = await Candidate.findOneAndUpdate(
      { _id: req.user.candidate },
      {
        $pull: {
          "experience.$[].roles": {
            _id: req.body.roleId,
          },
        },
      },
      { new: true }
    );

    // remove all experiences where roles array is empty
    let updatedExperience = updatedCandidate.experience.filter(
      (e) => e.roles.length > 0
    );
    console.log(updatedExperience);
    updatedCandidate = await Candidate.findByIdAndUpdate(
      req.user.candidate,
      {
        experience: updatedExperience,
      },
      {
        new: true, //if not already there then create it
      }
    );
  } else if (type === "skillAdd") {
    updatedCandidate = await Candidate.findByIdAndUpdate(req.user.candidate, {
      $push: { skills: req.body.data },
    });
  } else if (type == "skillsRemove") {
    const updatedItem = item.skills.filter((skill) => {
      return !req.body.data.includes(skill);
    });

    updatedCandidate = await Candidate.findByIdAndUpdate(
      req.user.candidate,
      {
        skills: updatedItem,
      },
      {
        new: true, //if not already there then create it
      }
    );
  } else if (type == "addEducation") {
    updatedCandidate = await Candidate.findByIdAndUpdate(req.user.candidate, {
      $push: { education: req.body.data },
    });
  } else if (type == "deleteEducation") {
    updatedCandidate = await Candidate.findOneAndUpdate(
      { _id: req.user.candidate },
      {
        $pull: {
          education: {
            _id: req.body.id,
          },
        },
      },
      { new: true }
    );
  } else if (type == "editEducation") {
    let updatedEducation = item.education.map((e) => {
      if (e._id == req.body.data.id) {
        return req.body.data;
      } else return e;
    });

    updatedCandidate = await Candidate.findByIdAndUpdate(
      req.user.candidate,
      {
        education: updatedEducation,
      },
      {
        new: true, //if not already there then create it
      }
    );
  }
  res.status(200).json(updatedCandidate);
});

module.exports = {
  updateCandidate,
  getCandidate,
};
