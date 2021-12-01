import express from "express";
const router = express.Router();
import cloudinary from "cloudinary";

import User from "../models/userSchema";
import authenticate from "../middleware/authMiddleWare";

router.post("/edit/profile", authenticate, async (req, res, next) => {
  try {
    const newData = {
      name: req.body.name,
      email: req.body.email,
      contactNo: req.body.contactNo,
    };

    if (req.files) {
      const editUser = User.findById(req.user.id);

      const imageID = editUser.profilePic.id;
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

    const userProfile = await User.findByIdAndUpdate(req.user.id, newData, {
      new: true,
      reunValidators: true,
      useFindAndModify: false,
    });

    userProfile.passwords = undefined;

    res.status(201).send({ "Details Changed Hit refreshed": userProfile });
  } catch (error) {
    return next(new Error(error.message));
  }
});

export default router;
