const mongoose = require("mongoose");

const userColecction = "usuarios";

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    role: { type: String, default: "user" },
  },
  {
    versionKey: false,
  }
);

const userModel = mongoose.model(userColecction, userSchema);

module.exports = { userModel };
