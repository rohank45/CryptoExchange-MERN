import express from "express";
const router = express.Router();
import cloudinary from "cloudinary";

import User from "../models/userSchema";

router.post("/register", async (req, res, next) => {
  try {
    let result;

    if (req.files) {
      const userProfilePic = req.files.profilePic;

      result = await cloudinary.v2.uploader.upload(
        userProfilePic.tempFilePath,
        {
          folder: "users",
          width: 150,
          crop: "scale",
        }
      );
    }

    const { name, email, contactNo, passwords, cpasswords } = req.body;

    if (!name || !email || !contactNo || !passwords || !cpasswords) {
      return next(new Error("All fields are mandatory"));
    }

    if (passwords !== cpasswords) {
      return next(new Error("Password and Confirm Password not matching"));
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return next(new Error("Already registered please Login"));
    }

    await User.create({
      // profilePic: {
      //   id: result.public_id,
      //   secure_url: result.secure_url,
      // },
      name,
      email,
      contactNo,
      passwords,
    });

    res.status(201).send("User registered successFully!");
  } catch (error) {
    return next(new Error(error));
  }
});

export default router;
