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
        startDate: String,
        endDate: String,
      },
    ],
  },
  education: {
    type: [
      {
        name: String,
        address: String,
        field: [{ title: String, startDate: String, endDate: String }],
      },
    ],
  },
  skills: {
    type: [{ name: String }],
  },
});

module.exports = mongoose.model("Candidate", candidateSchema);
