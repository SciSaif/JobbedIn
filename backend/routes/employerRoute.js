const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  registerEmployer,
  loginEmployer,
  getMe,
  getEmployerById,
  updateEmployer,
  deleteEmployer,
} = require("../controllers/employerController");
const { route } = require("express/lib/application");
const router = express.Router();

console.log("r er");

router
  .route("/")
  .post(registerEmployer)
  .put(protect, updateEmployer)
  .delete(protect, deleteEmployer);

router.get("/:id", getEmployerById);

router.post("/login", loginEmployer);
router.post("/me", protect, getMe);

module.exports = router;
