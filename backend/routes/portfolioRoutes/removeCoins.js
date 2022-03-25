const express = require("express");
const router = express.Router();
const User = require("../../models/userSchema");
const authMiddleWare = require("../../middleware/authMiddleWare");

router.post("/remove/coins", authMiddleWare, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: {
        myCoins: { name: req.body.name },
      },
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
