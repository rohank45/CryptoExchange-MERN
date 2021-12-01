import express from "express";
const router = express.Router();
import crypto from "crypto";

import User from "../models/userSchema";

router.post("/reset/password/:token", async (req, res, next) => {
  try {
    const token = req.params.token;
    const encrypToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      encrypToken,
      forgetPassExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return next(new Error("Token is expired"));
    }

    const newPassword = req.body.newPasswords;
    const confirmPassword = req.body.confirmPasswords;

    if (!confirmPassword || !newPassword) {
      return next(new Error("All fields are mandatory!"));
    }

    if (confirmPassword !== newPassword) {
      return next(new Error("New Password and confirm password not matching!"));
    }

    user.passwords = newPassword;
    user.forgetPassToken = undefined;
    user.forgetPassExpiry = undefined;
    await user.save();

    res.status(201).send("password changed successfully!");
  } catch (error) {
    return next(new Error(error.message));
  }
});

export default router;
