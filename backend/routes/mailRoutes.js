const express = require("express");
const { sendMail } = require("../controllers/employerController");
const router = express.Router();

router.post("/", sendMail);

module.exports = router;
