const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs/dist/bcrypt");
require("dotenv").config();

const Employer = require("../models/employerModel");
const UserVerification = require("../models/UserVerification");
const PasswordReset = require("../models/passwordReset");

const path = require("path");

const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const req = require("express/lib/request");

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

const passwordReset = asyncHandler(async (req, res) => {
  const { email, redirectUrl } = req.body;
  const employer = await Employer.findOne({ email });

  if (!employer) {
    //user doesn't exist
    res.status(400);
    throw new Error("No account exists with the supplied email address");
  } else {
    //user exists

    //check if user is verified
    if (!employer.verified) {
      res.status(400);
      throw new Error("Email hasn't been verified yet. Check your inbox");
    } else {
      //user verified
      sendResetEmail(employer, redirectUrl, res);
    }
  }
});

const sendResetEmail = asyncHandler(async (userData, redirectUrl, res) => {
  let { _id, email } = userData;
  email = email.toLowerCase();
  const resetString = uuidv4() + _id;

  // First, we clear all existing reset records
  const result = PasswordReset.deleteMany({ userId: _id });

  //Now we send the email
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Password Reset",
    html: `<p>We heard that you lost the password.  </p><p>Don't worry, use the link below to reset it.</p> <p> This link <b>expires in 6 hours.</b></p> <p>Press <a href=${
      redirectUrl + "/" + _id + "/" + resetString
    } >here</a> to proceed.</p>`,
  };

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedResetString = await bcrypt.hash(resetString, salt);

  // set values in password reset collection

  const newPasswordReset = await PasswordReset.create({
    userId: _id,
    resetString: hashedResetString,
    createdAt: Date.now(),
    expiresAt: Date.now() + 3600000,
  });

  if (newPasswordReset) {
    let info = await transporter.sendMail(mailOptions);

    if (info.accepted) {
      res.status(200).json({
        status: "PENDING",
        message: "Password reset email sent",
      });
    } else if (info.rejected) {
      res.status(400);
      throw new Error("Failed to send mail");
    }
  } else {
    res.status(400);
    throw new Error("Couldn't save password reset data");
  }
});

// actually reset the password
const executeResetPassword = asyncHandler(async (req, res) => {
  let { userId, resetString, newPassword } = req.body;

  const result = await PasswordReset.findOne({ userId });

  if (!result) {
    res.status(400);
    throw new Error("Password reset record not found");
  }

  //password reset record exists so we proceed

  const { expiresAt } = result;
  const hashedResetString = result.resetString;

  //Checking for expired reset string
  if (expiresAt < Date.now()) {
    //expired reset string
    await PasswordReset.deleteOne({ userId });
    res.status(400);
    throw new Error("Password reset link has expired");
  } else {
    //valid reset record exists wo we validate the reset string
    // first compare the hashed reset string

    if (await bcrypt.compare(resetString, hashedResetString)) {
      //strings matched
      //hash the new password

      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);
      await Employer.updateOne(
        { _id: userId },
        { password: hashedNewPassword }
      );

      //update complete
      //now delete reset record

      await PasswordReset.deleteOne({ userId });

      //both user record and reset record updated
      res.status(200).json({
        status: "SUCCESS",
        message: "Password has been reset successfully",
      });
    } else {
      //Existing record but incorrect reset string passed
      res.status(400);
      throw new Error(
        "Check the latest password reset email, you probably clicked an old link."
      );
    }
  }
});

module.exports = {
  passwordReset,
  executeResetPassword,
};
