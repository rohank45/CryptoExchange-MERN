const express = require("express");
const router = express.Router();
const passport = require("passport");
require("./passport");

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
  (req, res) => {
    try {
      // res.send(req.user);
      console.log(req.user);
      res.redirect("http://localhost:3000");
    } catch (error) {
      console.log(error.message);
    }
  }
);

router.get("/oauth/profile", (req, res) => {
  try {
    console.log("user", req.user);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/oauth/logout", (req, res) => {
  try {
    req.session = null;
    req.logout();
    res.redirect("http://localhost:3000/");
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;

// for frontend
// <div className="flex justify-center mt-40 gap-10">
//   <button className="bg-indigo-700 text-white text-2xl py-3 px-2 rounded-md">
//     <a href="http://localhost:5000/auth/google">Google sign in</a>
//   </button>

//   <button className="bg-red-700 text-white text-2xl py-3 px-2 rounded-md">
//     <a href="http://localhost:5000/oauth/logout">Google logout</a>
//   </button>
// </div>;
