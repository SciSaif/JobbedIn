const { defaultConfiguration } = require("express/lib/application");
const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Employer",
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
    applicants: {
      type: Number,
      min: 0,
      required: true,
    },
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
