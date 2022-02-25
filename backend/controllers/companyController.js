const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Job = require("../models/jobModel");
const Company = require("../models/companyModel");

// @desc Add a company by user
// @route POST /api/company
// @access Private
const addCompany = asyncHandler(async (req, res) => {
  // console.log("p");
  const {
    name,
    website,
    industry,
    companySize,
    companyType,
    address,
    logo,
    tagline,
  } = req.body;

  if (!name || !industry || !companySize || !companyType || !address) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  if (req.user.designation !== "employer") {
    res.status(400);
    throw new Error("User is not an employer");
  }

  const company = await Company.create({
    name,
    website,
    industry,
    companySize,
    companyType,
    address,
    logo,
    tagline,
    postedBy: req.user._id,
  });

  if (company) {
    res.status(201).json({
      _id: company._id,
      name: company.name,
      website: company.website,
      industry: company.industry,
      companySize: company.companySize,
      companyType: company.companyType,
      address: company.address,
      logo: company.logo,
      tagline: company.tagline,
      postedBy: company.postedBy,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc Get a particular company by id
// @route GET /api/company/:id
// @access Public
const getCompanyById = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);
  if (!company) {
    res.status(404);
    throw new Error("Job not found");
  }

  res.status(200).json(company);
});

// @desc Get companies by user id
// @route GET /api/company
// @access Public
const getCompaniesByUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.headers.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const companies = await Company.find({ postedBy: req.headers.id });
  res.status(200).json(companies);
});

module.exports = { addCompany, getCompanyById, getCompaniesByUser };
