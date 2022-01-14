const express = require("express");
const router = express.Router();
const authMiddleWare = require("../middleware/authMiddleWare");
const mailHelper = require("../utils/mailHelper");
const User = require("../models/userSchema");

router.get("/logout", authMiddleWare, async (req, res) => {
  const user = await User.findById(req.user.id);

  //mail sent
  await mailHelper({
    email: user.email,
    subject: "Logout At TP-Coin",
    message:
      "You've successfully Logout at TP-Coin India's leading Crypto Currency Exchange!",
  });

  res.clearCookie("token");
  res.status(201).send("Logout successful!");
});

module.exports = router;
