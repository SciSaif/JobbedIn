const asyncHandler = require("express-async-handler");
const brcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");
require("dotenv").config();

const Employer = require("../models/employerModel");
const Job = require("../models/jobModel");
const UserVerification = require("../models/UserVerification");

const path = require("path");

const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");

//oAuth
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.AUTH_EMAIL,
    clientId: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    refreshToken: process.env.AUTH_REFRESH_TOKEN,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready for messages");
    console.log(success);
  }
});

const sendMail = (req, res) => {
  const { to, subject, message } = req.body;

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: to,
    subject: subject,
    text: message,
  };

  transporter
    .sendMail(mailOptions)
    .then(() => {
      res.json({
        status: "SUCCESS",
        message: "Message sent successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      res.json({
        status: "FAILED",
        message: "An error occured while sending mail",
      });
    });
};

// Send verification email
const sendVerificationEmail = ({ _id, email }, res) => {
  // URL to be used in the email
  const currentUrl = "http://localhost:5000/";

  const uniqueString = uuidv4() + _id;

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verify Your Email",
    html: `<p> Verify your email address to complete the signup and login into your account. </p> <p> This link <b>expires in 6 hours.</b></p> <p>Press <a href=${
      currentUrl + "api/employers/verify/" + _id + "/" + uniqueString
    } >here</a> to proceed.</p>`,
  };

  // hash the uniqueString
  const saltRounds = 10;
  bcrypt
    .hash(uniqueString, saltRounds)
    .then((hashedUniqueString) => {
      // set calues in user Verification colletion
      const newVerification = new UserVerification({
        userId: _id,
        uniqueString: hashedUniqueString,
        createdAt: Date.now(),
        expiresAt: Date.now() + 21600000,
      });

      newVerification
        .save()
        .then(() => {
          transporter
            .sendMail(mailOptions)
            .then(() => {
              // email send and verification record saved
              console.log("send mail");
              res.json({
                status: "PENDING",
                message: "Verification email send",
              });
            })
            .catch((error) => {
              console.log(error);
              res.json({
                status: "FAILED",
                message: "Verification email failed",
              });
            });
        })
        .catch((error) => {
          console.log(error);
          res.json({
            status: "FAILED",
            message: "Couldn't save verification email data!",
          });
        });
    })
    .catch(() => {
      res.json({
        status: "FAILED",
        message: "An error occurred while hashing email data",
      });
    });
};

//verify email
const verifyEmail = (req, res) => {
  console.log("inside verifyEmail");
  let { userId, uniqueString } = req.params;
  UserVerification.find({ userId })
    .then((result) => {
      if (result.length > 0) {
        // User verification record exists so we proceed

        const { expiresAt } = result[0];
        const hashedUniqueString = result[0].uniqueString;

        // Checking for expired unique string
        if (expiresAt < Date.now()) {
          // record has expired so we delete it
          UserVerification.deleteOne({ userId })
            .then((result) => {
              Employer.deleteOne({ _id: userId })
                .then(() => {
                  let message = "Link has expired. Please sign up again";
                  res.redirect(
                    `/api/employers/verified/error=true&message=${message}`
                  );
                })
                .catch((error) => {
                  let message =
                    "Clearing user with expired unique string failed";
                  res.redirect(
                    `/api/employers/verified/error=true&message=${message}`
                  );
                });
            })
            .catch((error) => {
              console.log(error);
              let message =
                "An error occurred while clearing expired user verification record";
              res.redirect(
                `/api/employers/verified/error=true&message=${message}`
              );
            });
        } else {
          // valid record exists so we validate the user string
          // First compare the hashed unique string

          bcrypt
            .compare(uniqueString, hashedUniqueString)
            .then((result) => {
              if (result) {
                //Strings match

                Employer.updateOne({ _id: userId }, { verified: true })
                  .then(() => {
                    UserVerification.deleteOne({ userId })
                      .then(() => {
                        res.sendFile(
                          path.join(__dirname, "./../views/verified.html")
                        );
                      })
                      .catch((error) => {
                        console.log(error);
                        let message =
                          "An error occurred while finalizing successful";
                        res.redirect(
                          `/api/employers/verified/error=true&message=${message}`
                        );
                      });
                  })
                  .catch((error) => {
                    console.log(error);
                    let message =
                      "An error occurred while updating user record to show verified";
                    res.redirect(
                      `/api/employers/verified/error=true&message=${message}`
                    );
                  });
              } else {
                //existing record but incorrect verification details passed
                let message =
                  "Invalid verifiation details passed. Check your inbox";
                res.redirect(
                  `/api/employers/verified/error=true&message=${message}`
                );
              }
            })
            .catch((error) => {
              let message = "An error occurred while comparing unique string";
              res.redirect(
                `/api/employers/verified/error=true&message=${message}`
              );
            });
        }
      } else {
        // user verification record doesn't exist
        let message =
          "Account record doesn't exist or has been verified already. Please sign up or log in";
        res.redirect(`/api/employers/verified/error=true&message=${message}`);
      }
    })
    .catch((error) => {
      console.log(error);
      let message =
        "An error occurred while checking for existing user verification record";
      res.redirect(`/api/employers/verified/error=true&message=${message}`);
    });
};

const verifiedEmail = (req, res) => {
  res.sendFile(path.join(__dirname, "./../views/verified.html"));
};

// @desc Register an employer
// @route /api/employers
// @access Public
const registerEmployer = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    mobileNumber,
    companyName,
    address,
    description,
  } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !mobileNumber ||
    !companyName ||
    !address ||
    !description
  ) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // Check if employer already exists
  const employerExists = await Employer.findOne({ email: email });

  if (employerExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create Employer
  const employer = await Employer.create({
    name,
    email,
    password: hashedPassword,
    mobileNumber,
    companyName,
    address,
    description,
    verified: false,
  });

  if (employer) {
    sendVerificationEmail(employer, res);
    // res.status(201).json({
    //   // handle account verification
    //   _id: employer._id,
    //   name: employer.name,
    //   email: employer.email,
    //   mobileNumber: employer.mobileNumber,
    //   companyName: employer.companyName,
    //   address: employer.address,
    //   description: employer.description,
    //   token: generateToken(employer._id),
    // });
  } else {
    res.status(400);
    throw new Error("Invalid Employer Data");
  }
});

// @desc Login an employer
// @route /api/employers/login
// @access Public
const loginEmployer = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  const employer = await Employer.findOne({ email });

  // @todo proceed only if verified
  if (employer && !employer.verified) {
    res.status(400);
    throw new Error("Email is not verified yet. Check your inbox.");
  }

  // check if employer exists and match password
  if (employer && (await bcrypt.compare(password, employer.password))) {
    res.status(200).json({
      _id: employer.id,
      name: employer.name,
      email: employer.email,
      mobileNumber: employer.mobileNumber,
      companyName: employer.companyName,
      address: employer.address,
      description: employer.description,
      token: generateToken(employer._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

// @desc Get current employer
// @route /api/employers/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  const employer = {
    id: req.employer._id,
    email: req.employer.email,
    name: req.employer.name,
    mobileNumber: req.employer.mobileNumber,
    companyName: req.employer.companyName,
    address: req.employer.address,
    description: req.employer.mobileNumber,
  };
  res.status(200).json(employer);
});

// @desc Get employer details by id
// @route /api/employers/:id
// @access Public
const getEmployerById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("id in controller", id);
  const employer = await Employer.findById(id);

  if (!employer) {
    res.status(401);
    throw new Error("Employer not found");
  }

  // @todo remove password form employer
  res.status(200).json(employer);
});

// @desc Update employer details
// @route /api/employers
// @access Private
const updateEmployer = asyncHandler(async (req, res) => {
  const { name, mobileNumber, companyName, address, description } = req.body;

  if (!name || !mobileNumber || !companyName || !address || !description) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  const employer = await Employer.findById(req.employer.id);

  if (!employer) {
    res.status(401);
    throw new Error("Employer not found");
  }

  const updatedData = await Employer.findByIdAndUpdate(
    req.employer.id,
    { name, mobileNumber, companyName, address, description },
    {
      new: true, //if not already there then create it
    }
  );

  // @todo remove password form employer
  res.status(200).json(updatedData);
});

// @desc Delete employer account
// @route DELETE /api/employers/
// @access Private
const deleteEmployer = asyncHandler(async (req, res) => {
  //get employer using the id in the JWT
  const employer = await Employer.findById(req.employer.id);

  if (!employer) {
    res.status(401);
    throw new Error("Employer not found");
  }

  // check if employer exists and match password
  if (await bcrypt.compare(req.headers.password, employer.password)) {
    await Job.deleteMany({ employer: employer._id });
    await employer.remove();
    res.status(200).json({ success: true, type: "deleteEmployer" });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

//Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerEmployer,
  loginEmployer,
  getMe,
  getEmployerById,
  updateEmployer,
  deleteEmployer,
  sendMail,
  verifyEmail,
  verifiedEmail,
};
