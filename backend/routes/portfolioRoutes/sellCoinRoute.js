const express = require("express");
const router = express.Router();
const User = require("../../models/userSchema");
const authMiddleWare = require("../../middleware/authMiddleWare");

router.post("/sell/coins", authMiddleWare, async (req, res) => {
  const { coinId, image, symbol, name, quanity } = req.body;
  const userEmail = await User.findById(req.user.id);

  // console.log(userEmail.coins);

  try {
    const coins = {
      coinId,
      image,
      symbol,
      name,
      quanity,
    };

    await User.findOneAndUpdate(
      {
        email: userEmail.email,
      },
      {
        $pull: {
          coins: coins,
        },
      }
    );

    // await User.findByIdAndDelete(
    //   {
    //     coinId: userEmail.coins._id,
    //   },
    //   {
    //     $pull: {
    //       coins: coins,
    //     },
    //   }
    // );

    res.status(201).json({ message: "Coin sell Successfully!" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

// const { coinId, image, symbol, name, quantity } = req.body;
// const loginUser = await User.findById(req.user.id);

// const coins = {
//   coinId,
//   image,
//   symbol,
//   name,
//   quantity,
// };

// await User.findOneAndUpdate(
//   {
//     email: loginUser.email,
//   },
//   {
//     $push: {
//       coins: coins,
//     },
//   }
// );
