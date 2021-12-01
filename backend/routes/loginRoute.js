import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";

import User from "../models/userSchema";

router.post("/login", async (req, res, next) => {
  try {
    const { email, passwords } = req.body;

    if (!email || !passwords) {
      return next(new Error("All fields are mandatory"));
    }

    //checking email
    const checkUser = await User.findOne({ email: email });
    if (!checkUser) {
      return next(new Error("Invalid Credentials"));
    }

    //checking password
    const checkPassword = await bcrypt.compare(passwords, checkUser.passwords);
    if (!checkPassword) {
      return next(new Error("Invalid Credentials"));
    }

    const token = await checkUser.generateToken();

    //expiry time is 30 mins
    res.status(201).cookie("token", token, {
      expires: new Date(Date.now() + 1800000),
      httpOnly: true,
    });

    res.status(201).send("User Login successFully!");
  } catch (error) {
    return next(new Error(error));
  }
});

export default router;
