const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { updateCandidate } = require("../controllers/candidateController");
const { route } = require("express/lib/application");
const router = express.Router();

router.put("/", protect, updateCandidate);

module.exports = router;
