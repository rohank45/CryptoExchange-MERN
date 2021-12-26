const express = require("express");
const router = express.Router();
const User = require("../../models/userSchema");
const authMiddleWare = require("../../middleware/authMiddleWare");

router.post("/add/coins/watchlist", authMiddleWare, async (req, res) => {
  try {
    const {
      watchlist_coinId,
      watchlist_image,
      watchlist_symbol,
      watchlist_name,
    } = req.body;

    const watchlistCoins = {
      watchlist_coinId,
      watchlist_image,
      watchlist_symbol,
      watchlist_name,
    };

    const loginUser = await User.findById(req.user.id);
    loginUser.watchlists.unshift(watchlistCoins);
    await loginUser.save();

    res
      .status(201)
      .json({ message: "Coin added to watchlist, please check watchlist!" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
