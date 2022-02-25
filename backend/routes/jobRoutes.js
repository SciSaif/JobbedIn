const express = require("express");
const {
  getJobsByUser,
  createJob,
  getJobById,
  updateJob,
  deleteJob,
  getAllJobs,
} = require("../controllers/jobController");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(getJobsByUser).post(protect, createJob);
console.log("l");

router.route("/all").get(getAllJobs);

router
  .route("/:id")
  .get(getJobById)
  .delete(protect, deleteJob)
  .put(protect, updateJob);

module.exports = router;
