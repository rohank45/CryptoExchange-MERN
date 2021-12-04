const express = require("express");
const router = express.Router();

const User = require("../models/userSchema");
const mailHelper = require("../utils/mailHelper");

router.post("/forgot/password", async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(401).json({ message: "Please provide a email!" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User dont exists with that email!" });
    }

    //generating and saving a forgot password token
    const forgotToken = user.getForgetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const url = `http://localhost:3000/reset/password/${forgotToken}`;

    // const message = `Copy-Paste this link and hit enter to reset password. \n\n ${url}`;
    const message = `<h2><a target="_blank" rel="noopener noreferrer" href=${url} >Click</a> to reset a password.</h2>`;

    //sending token through email
    try {
      await mailHelper({
        email: user.email,
        subject: "You've requested Reset Password at TP-Coin CryptoWebApp!",
        message,
      });

      res.status(201).send("Password reset Link sended, please check email!");
    } catch (error) {
      (user.forgetPassToken = undefined), (user.forgetPassExpiry = undefined);
      await user.save({ validateBeforeSave: false });

      console.log(error.message);
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
