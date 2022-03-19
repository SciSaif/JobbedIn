const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  updateCandidate,
  getCandidate,
} = require("../controllers/candidateController");
const { route } = require("express/lib/application");
const router = express.Router();

router.route("/").put(protect, updateCandidate);
router.route("/:id").get(getCandidate);

module.exports = router;
