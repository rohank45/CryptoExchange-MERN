const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const googleUserSchema = new mongoose.Schema({
  photo: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    default: "user",
  },
  googleId: {
    type: String,
  },
});

//generating JWT token
googleUserSchema.methods.generateToken = async function () {
  return jwt.sign({ id: this._id }, process.env.PASSPORT_SECRET_KEY);
};

const googleUser = mongoose.model("GoogleUser", googleUserSchema);
module.exports = googleUser;
