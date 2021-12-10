const express = require("express");
const router = express.Router();
const User = require("../../models/userSchema");
const authMiddleWare = require("../../middleware/authMiddleWare");

router.get("/empty/watchlist", authMiddleWare, async (req, res) => {
  const loginUser = await User.findById(req.user.id);

  try {
    await User.findOneAndUpdate(
      {
        email: loginUser.email,
      },
      {
        watchlists: [],
      }
    );

    res.status(201).json({ message: "Watchlist is empty now!" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
