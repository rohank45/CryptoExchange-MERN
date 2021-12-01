import express from "express";
const router = express.Router();

import User from "../models/userSchema";
import authenticate from "../middleware/authMiddleWare";

router.get("/profile", authenticate, async (req, res, next) => {
  try {
    const userProfile = await User.findById(req.user.id);

    userProfile.passwords = undefined;

    res.status(201).send({ userProfile });
  } catch (error) {
    return next(new Error(error.message));
  }
});

export default router;
