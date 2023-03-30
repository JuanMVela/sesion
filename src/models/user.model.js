const mongoose = require("mongoose");

const userColecction = "usuarios";

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
  },
  {
    versionKey: false,
  }
);

const userModel = mongoose.model(userColecction, userSchema);

module.exports = { userModel };
