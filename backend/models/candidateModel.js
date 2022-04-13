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
        name: { type: String },
        address: { type: String },
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
  education: {
    type: [
      {
        name: String,
        address: String,
        field: [
          {
            title: String,
            startYear: String,
            endYear: String,
            present: Boolean,
          },
        ],
      },
    ],
  },
  skills: {
    type: [],
  },
});

module.exports = mongoose.model("Candidate", candidateSchema);
