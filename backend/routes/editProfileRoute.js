const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary");

const authMiddleWare = require("../middleware/authMiddleWare");
const User = require("../models/userSchema");

router.post("/edit/profile", authMiddleWare, async (req, res, next) => {
  try {
    const newData = {
      fullName: req.body.fullName,
      email: req.body.email,
      contactNo: req.body.contactNo,
    };

    if (req.files) {
      const user = await User.findById(req.user.id);

      const imageID = user.profilePic.id;
      await cloudinary.v2.uploader.destroy(imageID);

      const result = await cloudinary.v2.uploader.upload(
        req.files.profilePic.tempFilePath,
        {
          folder: "users",
          width: 150,
          crop: "scale",
        }
      );

      newData.profilePic = {
        id: result.public_id,
        secure_url: result.secure_url,
      };
    }

    await User.findByIdAndUpdate(req.user.id, newData, {
      new: true,
      reunValidators: true,
      useFindAndModify: false,
    });

    res.status(201).json({ message: "details Changed successfully" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
