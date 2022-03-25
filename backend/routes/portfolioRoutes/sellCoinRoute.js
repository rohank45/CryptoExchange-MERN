const express = require("express");
const router = express.Router();
const User = require("../../models/userSchema");
const authMiddleWare = require("../../middleware/authMiddleWare");

router.post("/sell/coins", authMiddleWare, async (req, res) => {
  try {
    const loginUser = await User.findById(req.user.id);
    const userRes = loginUser.myCoins.find(
      (e) => e.name === req.body.coins.name
    );
    userRes.quantity = req.body.coins.quantity;
    await loginUser.save();

    res.status(201).json({ message: "Coin sell Successfully!" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
