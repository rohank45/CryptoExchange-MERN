const express = require("express");
const router = express.Router();
const googleIsLogin = require("../../middleware/isGoogleLogin");

router.get("/profile", googleIsLogin, (req, res) => {
  res.status(201).send(req.user);
});

module.exports = router;
