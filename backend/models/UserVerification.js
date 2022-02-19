const mongoose = require("mongoose");

const userVerificationSchema = mongoose.Schema({
  userId: String,
  uniqueString: String,
  createdAt: Date,
  expiresAt: Date,
});

module.exports = mongoose.model("UserVerification", userVerificationSchema);
