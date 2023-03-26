const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// registration
userRouter.post("/register", async (req, res) => {
  const { email, pass, location, age } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      const user = new UserModel({ email, pass: hash, location, age });
      await user.save();
      res.status(200).send({ msg: "Registration has been done" });
    });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// Login
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(pass, user.pass, (err, result) => {
        if (result) {
          res
            .status(200)
            .send({
              msg: "Login successfull",
              token: jwt.sign({ userID: user._id }, "masai"),
            });
        } else {
          res.status(400).send({ msg: "Wrong credintial" });
        }
      });
    }

    //     user.length>0 ?  res.status(200).send({"msg":"Login Successfull!","token":jwt.sign({name:"superman"}, "clarkent")
    //  }) :
    //      res.status(400).send({"msg":"Login Failed!"})
    //     //  console.log(user);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

userRouter.get("/details", (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, "clarkent", (err, decoded) => {
    decoded
      ? res.status(200).send("User Details")
      : res
          .status(400)
          .send({ msg: "Login required, cannot access the restricted route" });
  });
});

userRouter.get("/moviedata", (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, "clarkent", (err, decoded) => {
    decoded
      ? res.status(200).send("Movie")
      : res
          .status(400)
          .send({ msg: "Login required, cannot access the restricted route" });
  });
});

module.exports = {
  userRouter,
};
