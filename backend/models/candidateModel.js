const mongoose = require("mongoose");

const candidateSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  bio: String,
  about: String,
  experience: {
    type: [
      {
        companyName: { type: String },
        company: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Company",
        },
        roles: [
          {
            title: String,
            location: { type: String },
            employmentType: String,
            startDate: {
              type: {
                year: String,
                month: String,
              },
            },
            endDate: {
              type: {
                present: Boolean,
                year: String,
                month: String,
              },
            },
          },
        ],
      },
    ],
  },
  education: {
    type: [
      {
        name: String,
        degree: String,
        fieldOfStudy: String,
        startDate: {
          type: {
            year: String,
            month: String,
          },
        },
        endDate: {
          type: {
            present: Boolean,
            year: String,
            month: String,
          },
        },
      },
    ],
  },
  skills: {
    type: [],
  },
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
      unique: true,
    },
  ],
});

module.exports = mongoose.model("Candidate", candidateSchema);
