const express = require("express");
const router = express.Router();
const User = require("../../models/userSchema");
const authMiddleWare = require("../../middleware/authMiddleWare");

router.post("/buy/coins", authMiddleWare, async (req, res, next) => {
  try {
    const { coinId, image, symbol, name, quanity } = req.body;
    const userEmail = await User.findById(req.user.id);

    const coins = {
      coinId,
      image,
      symbol,
      name,
      quanity,
    };

    const coinBuy = await User.findOneAndUpdate(
      {
        email: userEmail.email,
      },
      {
        $push: {
          coins: coins,
        },
      }
    );

    if (!coinBuy) {
      return res.status(401).json({ message: "Coin buy unSuccessfully!" });
    }

    res.status(201).json({ message: "Coin buy Successfully!" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
