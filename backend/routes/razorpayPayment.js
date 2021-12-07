const express = require("express");
const router = express.Router();
const userAuth = require("../middleware/authMiddleWare");

router.post("/razorpay/payment", userAuth, async (req, res, next) => {
  var instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
  });

  try {
    var options = {
      amount: req.body.amount * 100,
      currency: "INR",

      //create a token or unique id as a receipt create using crypto or uuid or nanoid
      receipt: "receipt#1",
    };

    const myOrder = await instance.orders.create(options);

    res.status(201).json({
      success: true,
      currency: "INR",
      amount: amount,
      order: myOrder,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
