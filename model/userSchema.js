const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  userPhone: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  userProfile: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("user", userSchema);
