const express = require("express");
const router = express.Router();
const User = require("../../models/userSchema");
const authMiddleWare = require("../../middleware/authMiddleWare");

router.post("/buy/coins", authMiddleWare, async (req, res) => {
  try {
    const {
      order_uniqueId,
      coinId,
      image,
      symbol,
      name,
      quantity,
      paymentToken,
    } = req.body;

    const myCoins = {
      order_uniqueId,
      coinId,
      image,
      symbol,
      name,
      quantity,
      paymentToken,
    };

    const order = await User.findOne({ order_uniqueId: order_uniqueId });
    console.log("order", order);

    // await User.findOne(
    //   { "users.myCoins": { $elemMatch: { order_uniqueId: order_uniqueId } } },
    //   function (err, user) {
    //     if (err) {
    //       return done(err);
    //     }

    //     if (user) {
    //       console.log("Order FOUND", user);
    //       next();
    //     } else {
    //       console.log("Order NOT FOUND");
    //       next();
    //     }
    //   }
    // );

    const loginUser = await User.findById(req.user.id);
    loginUser.myCoins.unshift(myCoins);
    await loginUser.save();

    res.status(201).json({ message: "Coin buy Successfully!" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
