const express = require("express");
const router = express.Router();
const googleIsLogin = require("../../middleware/isGoogleLogin");

router.get("/logout", googleIsLogin, (req, res) => {
  req.session = null;
  req.logout();
});

module.exports = router;
