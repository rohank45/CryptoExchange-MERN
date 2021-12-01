import express from "express";
const router = express.Router();
import authenticate from "../middleware/authMiddleWare";

router.get("/logout", authenticate, (req, res) => {
  res.clearCookie("token", { path: "/" });
  res.status(201).send("User logout!");
});

export default router;
