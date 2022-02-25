const mongoose = require("mongoose");

const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a company name"],
    },
    address: {
      type: String,
      required: [true, "Please add a company address"],
    },
    website: {
      type: String,
    },
    industry: {
      type: String,
      required: true,
    },
    companySize: {
      type: String,
      required: true,
    },
    companyType: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
    tagline: {
      Type: String,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
