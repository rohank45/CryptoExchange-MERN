const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const userAuth = require("../middleware/authMiddleWare");

//payment
router.post("/razorpay/payment", userAuth, async (req, res) => {
  var instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
  });

  const amount = req.body.amount;
  const currency = "INR";

  try {
    var options = {
      amount,
      currency,
      receipt: "receipt#1",
      notes: {
        key1: "value3",
        key2: "value2",
      },
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

//refund
router.post("/razorpay/refund", userAuth, async (req, res, next) => {
  var instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
  });

  try {
    const myRefund = instance.payments.refund(req.body.razorpay_payment_id, {
      amount: req.body.amount * 100,
      speed: "optimum",
      receipt: "Receipt No. 31",
    });

    res.status(201).json({
      success: true,
      currency: "INR",
      amount: amount,
      order: myRefund,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
