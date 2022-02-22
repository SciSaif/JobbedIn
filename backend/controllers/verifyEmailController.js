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
const sendVerificationEmail = ({ _id, email }, res) => {
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
                  res.redirect(`/api/verified/error=true&message=${message}`);
                })
                .catch((error) => {
                  let message =
                    "Clearing user with expired unique string failed";
                  res.redirect(`/api/verified/error=true&message=${message}`);
                });
            })
            .catch((error) => {
              console.log(error);
              let message =
                "An error occurred while clearing expired user verification record";
              res.redirect(`/api/verified/error=true&message=${message}`);
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
                          `/api/verified/error=true&message=${message}`
                        );
                      });
                  })
                  .catch((error) => {
                    console.log(error);
                    let message =
                      "An error occurred while updating user record to show verified";
                    res.redirect(`/api/verified/error=true&message=${message}`);
                  });
              } else {
                //existing record but incorrect verification details passed
                let message =
                  "Invalid verifiation details passed. Check your inbox";
                res.redirect(`/api/verified/error=true&message=${message}`);
              }
            })
            .catch((error) => {
              let message = "An error occurred while comparing unique string";
              res.redirect(`/api/verified/error=true&message=${message}`);
            });
        }
      } else {
        // user verification record doesn't exist
        let message =
          "Account record doesn't exist or has been verified already. Please sign up or log in";
        res.redirect(`/api/verified/error=true&message=${message}`);
      }
    })
    .catch((error) => {
      console.log(error);
      let message =
        "An error occurred while checking for existing user verification record";
      res.redirect(`/api/verified/error=true&message=${message}`);
    });
};

const verifiedEmail = (req, res) => {
  res.sendFile(path.join(__dirname, "./../views/verified.html"));
};

module.exports = {
  verifyEmail,
  verifiedEmail,
  sendVerificationEmail,
};
