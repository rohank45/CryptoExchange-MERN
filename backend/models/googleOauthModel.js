const mongoose = require("mongoose");

const googleUserSchema = new mongoose.Schema({
  googleId: String,
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
});

const googleUser = mongoose.model("GoogleUser", googleUserSchema);
module.exports = googleUser;
