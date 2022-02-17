const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  registerEmployer,
  loginEmployer,
  getMe,
  getEmployerById,
} = require("../controllers/employerController");
const router = express.Router();

console.log("r er");

router.get("/:id", getEmployerById);

router.post("/", registerEmployer);
router.post("/login", loginEmployer);
router.post("/me", protect, getMe);

module.exports = router;
