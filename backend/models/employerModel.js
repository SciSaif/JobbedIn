const mongoose = require("mongoose");

const employerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    mobileNumber: {
      type: String,
      required: [true, "Please add a mobile number"],
    },
    companyName: {
      type: String,
      required: [true, "Please add a company name"],
    },
    address: {
      type: String,
      required: [true, "Please add a company address"],
    },
    description: {
      type: String,
      required: [true, "Pleas add a description for your company"],
    },
    verified: Boolean,
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employer", employerSchema);
