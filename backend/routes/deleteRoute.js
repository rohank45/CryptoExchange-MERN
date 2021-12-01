import express from "express";
import authMiddleWare from "../middleware/authMiddleWare";
import User from "../models/userSchema";
const router = express.Router();

router.delete("/deleteUser", authMiddleWare, async (req, res, next) => {
  try {
    const userId = await User.findById(req.user.id);

    await User.deleteOne({ userId });

    res.status(201).send("User deleted successfully");
  } catch (error) {
    return next(new Error(error));
  }
});

export default router;
