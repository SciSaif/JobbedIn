const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  registerUser,
  updateUser,
  deleteUser,
  getUserById,
  loginUser,
  getMe,
  refreshUser,
  changePassword,
  updateProfilePic,
} = require("../controllers/userController");
const { route } = require("express/lib/application");
const router = express.Router();

router.put("/changePassword", protect, changePassword);

router
  .route("/")
  .post(registerUser)
  .put(protect, updateUser)
  .delete(protect, deleteUser);

router.get("/:id", getUserById);
router.put("/:id/updateProfilePic", protect, updateProfilePic);

router.post("/login", loginUser);
router.post("/refresh", protect, refreshUser);

router.post("/me", protect, getMe);

module.exports = router;
