const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const authMiddleWare = async (req, res, next) => {
  try {
    // const token =
    //   req.cookies.token || req.header("Authorization").replace("Bearer", "");

    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Login first to access this page" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Token not found plzz Login!" });
  }
};

module.exports = authMiddleWare;
