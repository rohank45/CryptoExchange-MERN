const express = require("express");
const router = express.Router();
const authMiddleWare = require("../middleware/authMiddleWare");
const User = require("../models/userSchema");

router.get("/profile", authMiddleWare, async (req, res, next) => {
  try {
    const userProfile = await User.findById(req.user.id);

    userProfile.passwords = undefined;

    res.status(201).send({ userProfile });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
