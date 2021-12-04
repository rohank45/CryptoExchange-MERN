const mongoose = require("mongoose");

const googleUserSchema = new mongoose.Schema({
  photo: {
    type: String,
  },
  username: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  googleId: {
    type: String,
  },
});

const googleUser = mongoose.model("GoogleUser", googleUserSchema);
module.exports = googleUser;
