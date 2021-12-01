import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";

import User from "../models/userSchema";
import authenticate from "../middleware/authMiddleWare";

router.post("/change/password", authenticate, async (req, res, next) => {
  try {
    const oldPassword = req.body.oldPasswords;
    const newPassword = req.body.newPasswords;

    if (!oldPassword || !newPassword) {
      return next(new Error("All fields are mandatory!"));
    }

    const userId = req.user.id;
    const user = await User.findById(userId);

    const checkUserPass = await bcrypt.compare(oldPassword, user.passwords);
    if (!checkUserPass) {
      return next(new Error("Old password is wrong!"));
    }

    user.passwords = newPassword;
    await user.save();

    res.status(201).send("password changed successfully!");
  } catch (error) {
    return next(new Error(error.message));
  }
});

export default router;
