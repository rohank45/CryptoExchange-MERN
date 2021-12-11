const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary");

const authMiddleWare = require("../middleware/authMiddleWare");
const User = require("../models/userSchema");
const mailHelper = require("../utils/mailHelper");

router.delete("/deleteUser", authMiddleWare, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const imageID = user.profilePic.id;
    await cloudinary.v2.uploader.destroy(imageID);

    await User.findByIdAndRemove(req.user.id);

    res.clearCookie("token");

    //mail sent
    await mailHelper({
      email: user.email,
      subject: "Account Delete At TP-Coin",
      message:
        "You've successfully Deleted your account at TP-Coin India's leading Crypto Currency Exchange!",
    });

    res.status(201).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
