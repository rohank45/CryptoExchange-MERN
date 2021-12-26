const express = require("express");
const router = express.Router();
const User = require("../../models/userSchema");
const authMiddleWare = require("../../middleware/authMiddleWare");

router.post("/sell/coins", authMiddleWare, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: {
        myCoins: { coinId: req.body.coinId },
      },
    });

    // await User.findOneAndUpdate(
    //   { order_uniqueId: req.body.order_uniqueId },
    //   { quantity: quantity }
    // );

    res.status(201).json({ message: "Coin sell Successfully!" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
