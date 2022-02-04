const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  registerEmployer,
  loginEmployer,
  getMe,
} = require("../controllers/employerController");
const router = express.Router();
console.log("r1");

router.post("/", registerEmployer);
router.post("/login", loginEmployer);
router.post("/me", protect, getMe);

module.exports = router;
