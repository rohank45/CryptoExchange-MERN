const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  profilePic: {
    id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
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
    select: false,
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

const User = mongoose.model("crypto-users", userSchema);
module.exports = User;
