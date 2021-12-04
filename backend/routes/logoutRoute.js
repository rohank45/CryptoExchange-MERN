const express = require("express");
const router = express.Router();
const authMiddleWare = require("../middleware/authMiddleWare");

router.get("/logout", authMiddleWare, (req, res) => {
  res.clearCookie("token", { path: "/" });
  res.status(201).send("User logout!");
});

module.exports = router;
