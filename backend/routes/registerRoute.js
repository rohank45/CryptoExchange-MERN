const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary");

const User = require("../models/userSchema");

router.post("/register", async (req, res, next) => {
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
        .json({ message: "Please provide a profile picture!" });
    }

    const { name, email, contactNo, passwords, cpasswords } = req.body;

    if (!name || !email || !contactNo || !passwords || !cpasswords) {
      return res.status(401).json({ message: "All fields are mandatory!" });
    }

    if (passwords !== cpasswords) {
      return res
        .status(401)
        .json({ message: "Password and Confirm Password not matching!" });
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res
        .status(401)
        .json({ message: "Already registered please Login!" });
    }

    const userCheckNo = await User.findOne({ contactNo: contactNo });

    if (userCheckNo) {
      return res
        .status(401)
        .json({ message: "Please provide another contact Number!" });
    }

    await User.create({
      profilePic: {
        id: result.public_id,
        secure_url: result.secure_url,
      },
      name,
      email,
      contactNo,
      passwords,
    });

    res.status(201).json({ message: "User registered successFully!" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
