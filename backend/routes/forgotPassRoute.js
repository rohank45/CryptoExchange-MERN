import express from "express";
const router = express.Router();

import User from "../models/userSchema";
import mailHelper from "../utils/mailHelper";

router.post("/forgot/password", async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return next(new Error("please provide a email"));
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return next(new Error("please provide a valid email"));
    }

    //generating and saving a forgot password token
    const forgotToken = user.getForgetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const url = `${req.protocol}://${req.get(
      "host"
    )}/reset/password/${forgotToken}`;

    const message = `Copy Paste this link and hit enter to reset password. \n\n ${url}`;

    //https://mailtrap.io/inboxes/1541600/messages site

    //sending token through email
    try {
      await mailHelper({
        email: user.email,
        subject: "You've requested Reset Password at TP-Coin CryptoWebApp!",
        message,
      });

      res.status(201).send("Reset Link sended, please check email!");
    } catch (error) {
      (user.forgetPassToken = undefined), (user.forgetPassExpiry = undefined);
      await user.save({ validateBeforeSave: false });

      return next(new Error(error.message));
    }
  } catch (error) {
    return next(new Error(error.message));
  }
});

export default router;
