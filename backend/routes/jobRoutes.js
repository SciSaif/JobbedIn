const express = require("express");
const {
  getJobsByUser,
  createJob,
  getJobById,
  updateJob,
  deleteJob,
  getAllJobs,
  applyJob,
} = require("../controllers/jobController");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(getJobsByUser).post(protect, createJob);

router.route("/all").get(getAllJobs);

router
  .route("/:id")
  .get(getJobById)
  .delete(protect, deleteJob)
  .put(protect, updateJob);

router.route("/:id/apply").put(protect, applyJob);

module.exports = router;
