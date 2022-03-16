const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const User = require("../models/userSchema");

router.post("/reset/password/:token", async (req, res, next) => {
  try {
    const token = req.params.token;
    const encrypToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      encrypToken,
      forgetPassExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({ message: "token is expired!" });
    }

    const newPassword = req.body.newPasswords;
    const confirmPassword = req.body.confirmPasswords;

    if (!confirmPassword || !newPassword) {
      return res.status(401).json({ message: "all fields are mandatory!" });
    }

    if (confirmPassword !== newPassword) {
      return res
        .status(401)
        .json({ message: "new password and confirm password not matching!" });
    }

    user.passwords = newPassword;
    user.forgetPassToken = undefined;
    user.forgetPassExpiry = undefined;
    await user.save();

    res.status(201).json({ message: "Password changed successfully!" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
