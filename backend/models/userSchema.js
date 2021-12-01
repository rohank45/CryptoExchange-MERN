import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  profilePic: {
    id: {
      type: String,
    },
    secure_url: {
      type: String,
    },
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  contactNo: {
    type: Number,
    unique: true,
    required: true,
  },
  passwords: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  token: {
    type: String,
  },
  forgetPassToken: String,
  forgetPassExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//encryption on password field
userSchema.pre("save", async function (next) {
  if (this.isModified("passwords")) {
    this.passwords = await bcrypt.hash(this.passwords, 12);
  }

  next();
});

//generating JWT token
userSchema.methods.generateToken = async function () {
  return jwt.sign({ id: this._id }, process.env.SECRET_KEY);
};

//generating forget password token
userSchema.methods.getForgetPasswordToken = function () {
  const generateToken = crypto.randomBytes(20).toString("hex");

  this.forgetPassToken = crypto
    .createHash("sha256")
    .update(generateToken)
    .digest("hex");

  this.forgetPassExpiry = Date.now() + 20 * 60 * 1000;

  return generateToken;
};

const User = mongoose.model("USER", userSchema);
export default User;
