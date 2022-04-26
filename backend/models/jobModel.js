const { defaultConfiguration } = require("express/lib/application");
const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    companyID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Company",
    },
    title: {
      type: String,
      required: [true, "Please add a job title"],
    },
    workplaceType: {
      type: String,
      required: [true, "Please add a workplace type"],
      enum: ["On-Site", "Hybrid", "Remote"],
    },
    location: {
      type: String,
      required: false,
    },
    employmentType: {
      type: String,
      required: [true, "Please add an employment type"],
      enum: [
        "Full Time",
        "Part Time",
        "Contract",
        "Temporary",
        "Volunteer",
        "Internship",
      ],
    },
    description: {
      type: String,
      required: [true, "Please add a job description"],
    },
    payRange: {
      low: Number,
      high: Number,
      required: false,
    },
    numberOfApplicants: {
      type: Number,
      min: 0,
      required: true,
    },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
      },
    ],

    status: {
      type: String,
      required: true,
      enum: ["open", "closed"],
      default: "open",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
