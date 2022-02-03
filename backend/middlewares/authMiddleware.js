const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Employer = require("../models/employerModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      //Verify token (gives back id)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //Get employer from token
      req.employer = await Employer.findById(decoded.id).select("-password"); // get everything except password
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized");
  }
});

module.exports = { protect };
