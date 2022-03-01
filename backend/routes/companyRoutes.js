const express = require("express");
const {
  addCompany,
  getCompanyById,
  getCompaniesByUser,
  deleteCompany,
  updateCompany,
  getAllCompanies,
  getAllJobsByCompany,
} = require("../controllers/companyController");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

router.route("/").post(protect, addCompany).get(getCompaniesByUser);
router.route("/all").get(getAllCompanies);
router
  .route("/:id")
  .get(getCompanyById)
  .delete(protect, deleteCompany)
  .put(protect, updateCompany);

router.route("/:id/jobs").get(getAllJobsByCompany);

module.exports = router;
