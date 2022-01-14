const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary");

const User = require("../models/userSchema");
const mailHelper = require("../utils/mailHelper");

router.post("/register", async (req, res) => {
  try {
    let result;

    if (req.files) {
      result = await cloudinary.v2.uploader.upload(
        req.files.profilePic.tempFilePath,
        {
          folder: "users",
          width: 150,
          crop: "scale",
        }
      );
    } else {
      return res
        .status(401)
        .json({ message: "please provide a profile picture!" });
    }

    const { fullName, email, contactNo, passwords, cpasswords } = req.body;

    if (!fullName || !email || !contactNo || !passwords || !cpasswords) {
      return res.status(401).json({ message: "all fields are mandatory!" });
    }

    if (passwords !== cpasswords) {
      return res
        .status(401)
        .json({ message: "password and confirm password are not matching!" });
    }

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res
        .status(401)
        .json({ message: "already registered please Login!" });
    }

    const userCheckNo = await User.findOne({ contactNo: contactNo });
    if (userCheckNo) {
      return res
        .status(401)
        .json({ message: "please provide another contact number!" });
    }

    await User.create({
      profilePic: {
        id: result.public_id,
        secure_url: result.secure_url,
      },
      fullName,
      email,
      contactNo,
      passwords,
    });

    //mail sent
    await mailHelper({
      email: email,
      subject: "Registration At TP-Coin",
      message:
        "You've successfully completed Registration at TP-Coin India's leading Crypto Currency Exchange!",
    });

    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
