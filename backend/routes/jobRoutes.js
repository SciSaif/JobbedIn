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

router.route("/").get(getJobsByEmployer).post(protect, createJob);
console.log("l");

router.route("/all").get(getAllJobs);

router
  .route("/:id")
  .get(getJobByEmployer)
  .delete(protect, deleteJob)
  .put(protect, updateJob);

module.exports = router;
