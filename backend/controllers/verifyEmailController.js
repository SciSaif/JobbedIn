const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs/dist/bcrypt");
require("dotenv").config();

const Employer = require("../models/employerModel");
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

// Send verification email
const sendVerificationEmail = asyncHandler(async ({ _id, email }, res) => {
  // URL to be used in the email
  let currentUrl;
  if (process.env.NODE_ENV === "development") {
    currentUrl = "http://localhost:5000/";
  } else {
    currentUrl = "https://jobbedin.herokuapp.com/";
  }

  const uniqueString = uuidv4() + _id;

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verify Your Email",
    html: `<p> Verify your email address to complete the signup and login into your account. </p> <p> This link <b>expires in 6 hours.</b></p> <p>Press <a href=${
      currentUrl + "api/verify/" + _id + "/" + uniqueString
    } >here</a> to proceed.</p>`,
  };

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedUniqueString = await bcrypt.hash(uniqueString, salt);

  const newVerification = await UserVerification.create({
    userId: _id,
    uniqueString: hashedUniqueString,
    createdAt: Date.now(),
    expiresAt: Date.now() + 21600000,
  });

  if (newVerification) {
    let info = await transporter.sendMail(mailOptions);

    if (info.accepted) {
      res.status(200).json({
        status: "PENDING",
        message: "Verification email sent",
      });
    } else if (info.rejected) {
      res.status(400);
      throw new Error("Failed to send mail");
    }
  } else {
    res.status(400);
    throw new Error("Couldn't save verification email data!");
  }
});

//verify email
const verifyEmail = asyncHandler(async (req, res) => {
  let { userId, uniqueString } = req.params;

  const result = await UserVerification.findOne({ userId });

  console.log(result);

  if (result) {
    // User verification record exists so we proceed

    const { expiresAt } = result;
    const hashedUniqueString = result.uniqueString;

    // Checking for expired unique string
    if (expiresAt < Date.now()) {
      // record has expired so we delete it
      await UserVerification.deleteOne({ userId });
      await Employer.deleteOne({ _id: userId });
      let message = "Link has expired. Please sign up again";
      res.redirect(`/api/verified/?error=true&message=${message}`);
    } else {
      // valid record exists so we validate the user string
      // First compare the hashed unique string

      if (await bcrypt.compare(uniqueString, hashedUniqueString)) {
        //string match

        await Employer.updateOne({ _id: userId }, { verified: true });
        await UserVerification.deleteOne({ userId });
        res.sendFile(path.join(__dirname, "./../views/verified.html"));
      } else {
        //existing record but incorrect verification details passed
        let message = "Invalid verifiation details passed. Check your inbox";
        res.redirect(`/api/verified/?error=true&message=${message}`);
      }
    }
  } else {
    // user verification record doesn't exist
    let message =
      "Account record doesn't exist or has been verified already. Please sign up or log in";
    res.redirect(`/api/verified/?error=true&message=${message}`);
  }
});

const verifiedEmail = (req, res) => {
  if (req.query.error) {
    res.sendFile(path.join(__dirname, "./../views/error.html"));
  }
  res.sendFile(path.join(__dirname, "./../views/verified.html"));
};

module.exports = {
  verifyEmail,
  verifiedEmail,
  sendVerificationEmail,
};
