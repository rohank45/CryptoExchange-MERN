const express = require("express");
const router = express.Router();
const User = require("../../models/userSchema");
const authMiddleWare = require("../../middleware/authMiddleWare");

router.post("/remove/coins/watchlist", authMiddleWare, async (req, res) => {
  const {
    watchlist_coinId,
    watchlist_image,
    watchlist_symbol,
    watchlist_name,
  } = req.body;
  const loginUser = await User.findById(req.user.id);

  try {
    const watchlistCoins = {
      watchlist_coinId,
      watchlist_image,
      watchlist_symbol,
      watchlist_name,
    };

    await User.findOneAndUpdate(
      {
        email: loginUser.email,
      },
      {
        $pull: {
          watchlists: watchlistCoins,
        },
      }
    );

    res.status(201).json({
      message: "coin removed from watchlist, please check watchlist!",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
