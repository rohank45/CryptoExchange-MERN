const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/userSchema");

router.post("/login", async (req, res, next) => {
  try {
    const { email, passwords } = req.body;

    if (!email || !passwords) {
      return res.status(401).json({ message: "All fields are mandatory" });
    }

    //checking email
    const checkUser = await User.findOne({ email: email }).select("+passwords");

    if (!checkUser) {
      return res
        .status(401)
        .json({ message: "Invalid Credentials please register!" });
    }

    //checking password
    const checkPassword = await bcrypt.compare(passwords, checkUser.passwords);
    if (!checkPassword) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }

    const token = await checkUser.generateToken();

    //expiry time is 30 mins
    res.status(201).cookie("token", token, {
      expires: new Date(Date.now() + 1800000),
      httpOnly: true,
    });

    res.status(201).json({ message: "User Login successFully!" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
