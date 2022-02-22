const express = require("express");
const {
  verifiedEmail,
  verifyEmail,
} = require("../controllers/verifyEmailController");
const {
  passwordReset,
  executeResetPassword,
} = require("../controllers/passwordReset");
const router = express.Router();

//verify email routes
router.get("/verify/:userId/:uniqueString", verifyEmail);
router.get("/verified", verifiedEmail);

//forgot password routes
console.log("pr");
router.post("/passwordReset", passwordReset);
router.post("/executeResetPassword", executeResetPassword);

module.exports = router;
