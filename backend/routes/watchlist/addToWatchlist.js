const express = require("express");
const router = express.Router();
const User = require("../../models/userSchema");
const authMiddleWare = require("../../middleware/authMiddleWare");

router.post("/add/coins/watchlist", authMiddleWare, async (req, res) => {
  try {
    const { coinId, image, symbol, name } = req.body;
    const loginUser = await User.findById(req.user.id);

    const watchlistCoins = {
      coinId,
      image,
      symbol,
      name,
    };

    await User.findOneAndUpdate(
      {
        email: loginUser.email,
      },
      {
        $push: {
          watchlists: watchlistCoins,
        },
      }
    );
    res
      .status(201)
      .json({ message: "Coin added to watchlist, please check watchlist!" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
