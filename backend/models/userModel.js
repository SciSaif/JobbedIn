const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    designation: {
      type: String,
      required: true,
    },
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
    profilePic: {
      type: String,
    },
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Candidate",
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

module.exports = mongoose.model("User", userSchema);
