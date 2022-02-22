const mongoose = require("mongoose");

const PasswordResetSchema = mongoose.Schema({
  userId: String,
  resetString: String,
  createdAt: Date,
  expiresAt: Date,
});

module.exports = mongoose.model("PasswordReset", PasswordResetSchema);
