const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const authMiddleWare = require("../middleware/authMiddleWare");
const User = require("../models/userSchema");

router.post("/change/password", authMiddleWare, async (req, res, next) => {
  try {
    const oldPassword = req.body.oldPasswords;
    const newPassword = req.body.newPasswords;

    if (!oldPassword || !newPassword) {
      return res.status(401).json({ message: "all fields are mandatory!" });
    }

    if (oldPassword === newPassword) {
      return res.status(401).json({
        message: "old and new password should not be the same!",
      });
    }

    const userId = req.user.id;
    const user = await User.findById(userId).select("+passwords");

    const checkUserPass = await bcrypt.compare(oldPassword, user.passwords);
    if (!checkUserPass) {
      return res.status(401).json({ message: "old password is wrong!" });
    }

    user.passwords = newPassword;
    await user.save();

    res.status(201).json({ message: "Password changed successfully!" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
