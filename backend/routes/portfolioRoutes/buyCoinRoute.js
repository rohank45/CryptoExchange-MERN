const express = require("express");
const router = express.Router();
const User = require("../../models/userSchema");
const authMiddleWare = require("../../middleware/authMiddleWare");

const mongoose = require("mongoose");

router.post("/buy/coins", authMiddleWare, async (req, res, next) => {
  try {
    const { coinId, image, symbol, name, quantity, paymentToken } = req.body;

    const myCoins = {
      order_uniqueId: new mongoose.Types.ObjectId(),
      coinId,
      image,
      symbol,
      name,
      quantity,
      paymentToken,
    };

    const loginUser = await User.findById(req.user.id);
    loginUser.myCoins.unshift(myCoins);
    await loginUser.save();

    res.status(201).json({ message: "Coin buy Successfully!" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
