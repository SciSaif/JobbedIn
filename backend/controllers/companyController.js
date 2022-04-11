const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Job = require("../models/jobModel");
const Company = require("../models/companyModel");

const { cloudinary } = require("../utils/cloudinary");

// @desc Add a company by user
// @route POST /api/company
// @access Private
const addCompany = asyncHandler(async (req, res) => {
  // console.log("p");
  let {
    name,
    website,
    industry,
    companySize,
    companyType,
    address,
    logo,
    tagline,
  } = req.body;

  // console.log(req.body);

  if (!name || !industry || !companySize || !companyType || !address) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  if (req.user.designation !== "employer") {
    res.status(400);
    throw new Error("User is not an employer");
  }

  const fileStr = logo;
  const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
    upload_preset: "JobbedIn_company",
  });

  if (uploadedResponse && uploadedResponse.public_id) {
    logo = uploadedResponse.public_id;
  } else {
    req.statusCode(400);
    throw new Error("Failed to upload LOGO");
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
    // console.log(company);
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

// @desc Get all companies
// @route GET /api/company/all
// @access Public
const getAllCompanies = asyncHandler(async (req, res) => {
  const companies = await Company.find({});
  if (!companies) {
    res.status(404);
    throw new Error("No companies not found");
  }
  res.status(200).json(companies);
});

// @desc Get all jobs by company
// @route GET /api/company/:id/jobs
// @access Public
const getAllJobsByCompany = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const company = await Company.findById(id);
  if (!company) {
    res.status(404);
    throw new Error("Company not found!");
  }

  const jobs = await Job.find({ companyID: id });

  if (!jobs) {
    res.status(404);
    throw new Error("No jobs found!");
  }

  res.status(200).json(jobs);
});

// @desc delete company
// @route DELETE /api/company/:id
// @access Private
const deleteCompany = asyncHandler(async (req, res) => {
  //get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const company = await Company.findById(req.params.id);

  if (!company) {
    res.status(404);
    throw new Error("Company not found");
  }

  if (company.postedBy.toString() != req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  //delete all jobs associated with this company
  await Job.deleteMany({ companyID: company._id });

  await company.remove();

  res.status(200).json({ success: true });
});

// @desc update company
// @route PUT /api/company/:id
// @access Private
const updateCompany = asyncHandler(async (req, res) => {
  //get user using the id in the JWT
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const company = await Company.findById(req.params.id);

  if (!company) {
    res.status(404);
    throw new Error("Company not found");
  }

  if (company.postedBy.toString() != req.user._id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const updatedCompany = await Company.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true, //if not already there then create it
    }
  );

  res.status(200).json(updatedCompany);
});

// @desc update LOGO
// @route PUT /api/company/:id/updateLogo
// @access Private
const updateCompanyLogo = asyncHandler(async (req, res) => {
  //get user using the id in the JWT
  const user = await User.findById(req.user._id);
  let logo = req.body.logo;

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const company = await Company.findById(req.params.id);

  if (!company) {
    res.status(404);
    throw new Error("Company not found");
  }

  if (company.postedBy.toString() != req.user._id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  if (logo === "") {
    //delete previous logo
    if (company.logo) {
      await cloudinary.uploader.destroy(company.logo);
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      { logo: "" },
      {
        new: true, //if not already there then create it
      }
    );
    res.status(200).json(updatedCompany);
  }

  // add logo to cloudinary
  const fileStr = logo;
  const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
    upload_preset: "JobbedIn_company",
  });

  if (uploadedResponse && uploadedResponse.public_id) {
    logo = uploadedResponse.public_id;
    // console.log(logo);
  } else {
    req.statusCode(400);
    throw new Error("Failed to upload LOGO");
  }

  // delete previous logo
  if (company.logo) {
    await cloudinary.uploader.destroy(company.logo);
  }
  const updatedCompany = await Company.findByIdAndUpdate(
    req.params.id,
    { logo: logo },
    {
      new: true, //if not already there then create it
    }
  );

  // console.log(updatedCompany);

  res.status(200).json(updatedCompany);
});

module.exports = {
  addCompany,
  getCompanyById,
  getCompaniesByUser,
  deleteCompany,
  updateCompany,
  getAllCompanies,
  getAllJobsByCompany,
  updateCompanyLogo,
};
