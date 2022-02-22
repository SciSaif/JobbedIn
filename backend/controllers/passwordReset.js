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

const passwordReset = (req, res) => {
  const { email, redirectUrl } = req.body;
  Employer.find({ email })
    .then((data) => {
      if (data.length) {
        //user exists

        //check if user is verified
        if (!data[0].verified) {
          res.json({
            status: "FAILED",
            message: "Email hasn't been verified yet. Check your inbox",
          });
        } else {
          //user verified

          sendResetEmail(data[0], redirectUrl, res);
        }
      } else {
        //user doesn't exist
        res.json({
          status: "FAILED",
          message: "No account with the supplied email exists!",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.json({
        status: "FAILED",
        message:
          "An error occurred while checking for existing user(password Reset)",
      });
    });
};

//send password reset email
const sendResetEmail = (userData, redirectUrl, res) => {
  let { _id, email } = userData;
  email = email.toLowerCase();
  const resetString = uuidv4() + _id;

  // First, we clear all existing reset records
  PasswordReset.deleteMany({ userId: _id })
    .then((result) => {
      //Reset records deleted successfully

      //Now we send the email
      const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Password Reset",
        html: `<p>We heard that you lost the password.  </p><p>Don't worry, use the link below to reset it.</p> <p> This link <b>expires in 6 hours.</b></p> <p>Press <a href=${
          redirectUrl + "/" + _id + "/" + resetString
        } >here</a> to proceed.</p>`,
      };

      // hash the reset string
      const saltRounds = 10;
      bcrypt
        .hash(resetString, saltRounds)
        .then((hashedResetString) => {
          // set values in password reset collection

          const newPasswordReset = new PasswordReset({
            userId: _id,
            resetString: hashedResetString,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
          });

          newPasswordReset
            .save()
            .then(() => {
              transporter
                .sendMail(mailOptions)
                .then(() => {
                  // reset email send and password reset record saved
                  res.json({
                    status: "PENDING",
                    message: "Password reset email sent",
                  });
                })
                .catch((error) => {
                  console.log(error);
                  res.json({
                    status: "FAILED",
                    message: "Could not send mail",
                  });
                });
            })
            .catch((error) => {
              console.log(error);
              res.json({
                status: "FAILED",
                message: "Couldn't save password reset data!",
              });
            });
        })
        .catch((error) => {
          console.log(error);
          res.json({
            status: "FAILED",
            message: "An error occurred while hashign the password reset data!",
          });
        });
    })
    .catch((error) => {
      //error while clearing existing records
      console.log(error);
      res.json({
        status: "FAILED",
        message: "Clearing existing password reset records failed",
      });
    });
};

// actually reset the password
const executeResetPassword = (req, res) => {
  let { userId, resetString, newPassword } = req.body;

  PasswordReset.find({ userId })
    .then((result) => {
      if (result.length > 0) {
        //password reset record exists so we proceed

        const { expiresAt } = result[0];
        const hashedResetString = result[0].resetString;

        //Checking for expired reset string
        if (expiresAt < Date.now()) {
          PasswordReset.deleteOne({ userId })
            .then(() => {
              //reset record deleted successfully
              res.json({
                status: "FAILED",
                message: "Password reset link ash expired",
              });
            })
            .catch((error) => {
              console.log(error);
              res.json({
                status: "FAILED",
                message: "Clearing password reset record failed",
              });
            });
        } else {
          //valid reset record exists wo we validate the reset string
          // first compare the hashed reset string

          bcrypt
            .compare(resetString, hashedResetString)
            .then((result) => {
              if (result) {
                //strings matched
                //hash password again

                const saltRounds = 10;
                bcrypt
                  .hash(newPassword, saltRounds)
                  .then((hashedNewPassword) => {
                    //update user password

                    Employer.updateOne(
                      { _id: userId },
                      { password: hashedNewPassword }
                    )
                      .then(() => [
                        //update complete
                        //now delete reset record
                        PasswordReset.deleteOne({ userId })
                          .then(() => {
                            //both user record and reset record updated
                            res.json({
                              status: "SUCCESS",
                              message: "Password has been reset successfully",
                            });
                          })
                          .catch((error) => {
                            console.log(error);
                            res.json({
                              status: "FAILED",
                              message:
                                "An error occurred while finalizing password reset",
                            });
                          }),
                      ])
                      .catch((error) => {
                        console.log(error);
                        res.json({
                          status: "FAILED",
                          message:
                            "An error occurred while updating employer password",
                        });
                      });
                  })
                  .catch((error) => {
                    console.log(error);
                    res.json({
                      status: "FAILED",
                      message: "An error occurred while hashign new password",
                    });
                  });
              } else {
                //Existing record but incorrect reset string passed
                res.json({
                  status: "FAILED",
                  message: "Invalid password reset details passed",
                });
              }
            })
            .catch((error) => {
              console.log(error);
              res.json({
                status: "FAILED",
                message: "Comparing password reset strings failed",
              });
            });
        }
      } else {
        // password reset record doesn't exist
        res.json({
          status: "FAILED",
          message: "Password reset record not found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.json({
        status: "FAILED",
        message: "Checking for existing password reset record failed",
      });
    });
};

module.exports = {
  passwordReset,
  executeResetPassword,
};
