const express = require("express");
const {
  addCompany,
  getCompanyById,
  getCompaniesByUser,
} = require("../controllers/companyController");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

router.route("/").post(protect, addCompany).get(getCompaniesByUser);
router.route("/:id").get(getCompanyById);

module.exports = router;
