const express = require("express");
const router = express.Router();
const googleIsLogin = require("../../middleware/isGoogleLogin");

router.get("/logout", googleIsLogin, (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("http://localhost:3000/");
});

module.exports = router;
