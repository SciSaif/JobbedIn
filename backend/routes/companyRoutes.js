const express = require("express");
const {
  addCompany,
  getCompanyById,
  getCompaniesByUser,
  deleteCompany,
  updateCompany,
} = require("../controllers/companyController");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

router.route("/").post(protect, addCompany).get(getCompaniesByUser);
router
  .route("/:id")
  .get(getCompanyById)
  .delete(protect, deleteCompany)
  .put(protect, updateCompany);

module.exports = router;
