const express = require("express");
const {
  getJobsByEmployer,
  createJob,
  getJobByEmployer,
  updateJob,
  deleteJob,
  getAllJobs,
} = require("../controllers/jobController");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");
// console.log("l");

router.route("/").get(protect, getJobsByEmployer).post(protect, createJob);

router.route("/all").get(getAllJobs);

router
  .route("/:id")
  .get(getJobByEmployer)
  .delete(protect, deleteJob)
  .put(protect, updateJob);

module.exports = router;
