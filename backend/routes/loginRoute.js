const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
const mailHelper = require("../utils/mailHelper");

router.post("/login", async (req, res, next) => {
  try {
    const { email, passwords } = req.body;

    if (!email || !passwords) {
      return res.status(401).json({ message: "all fields are mandatory!" });
    }

    //checking email
    const checkUser = await User.findOne({ email: email }).select("+passwords");

    if (!checkUser) {
      return res
        .status(401)
        .json({ message: "invalid credentials please register!" });
    }

    //checking password
    const checkPassword = await bcrypt.compare(passwords, checkUser.passwords);
    if (!checkPassword) {
      return res.status(401).json({ message: "invalid credentials!" });
    }

    const token = await checkUser.generateToken();

    //expiry time is 30 mins
    res.status(201).cookie("token", token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    });

    //mail sent
    await mailHelper({
      email: email,
      subject: "Login At TP-Coin",
      message:
        "You've successfully Login at TP-Coin India's leading Crypto Currency Exchange!",
    });

    res.status(201).json({ message: "Login successful!" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
