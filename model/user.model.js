const mongoose = require("mongoose");

// user schema
const userSchema = mongoose.Schema(
  {
    email: String,
    pass: String,
    location: String,
    age: Number,
  },
  {
    versionKey: false,
  }
);

// create model
const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
