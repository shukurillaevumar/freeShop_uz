const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN", "MODERATOR"],
    required: true,
    default: "USER",
  },
  email: {
    type: String,
  },
  user_name: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Number,
    required: true,
  },
  updated_at: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
