const express = require("express");
const router = express.Router();
const User = require("../../models/userSchema");
const authMiddleWare = require("../../middleware/authMiddleWare");

router.post("/buy/coins", authMiddleWare, async (req, res, next) => {
  try {
    const { coinId, image, symbol, name, quantity } = req.body;
    const loginUser = await User.findById(req.user.id);

    const coins = {
      coinId,
      image,
      symbol,
      name,
      quantity,
    };

    await User.findOneAndUpdate(
      {
        email: loginUser.email,
      },
      {
        $push: {
          coins: coins,
        },
      }
    );
    res.status(201).json({ message: "Coin buy Successfully!" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
