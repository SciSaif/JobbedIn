const express = require("express");
const { getJob, createJob } = require("../controllers/jobController");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(protect, getJob).post(protect, createJob);

module.exports = router;
