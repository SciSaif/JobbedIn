const express = require("express");
const {
  getJobsByEmployer,
  createJob,
  getJobByEmployer,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");
// console.log("e2");

router.route("/").get(protect, getJobsByEmployer).post(protect, createJob);

router
  .route("/:id")
  .get(protect, getJobByEmployer)
  .delete(protect, deleteJob)
  .put(protect, updateJob);

module.exports = router;
