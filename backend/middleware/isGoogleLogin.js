const googleIsLogin = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Login first to access this google page" });
  }

  next();
};

module.exports = googleIsLogin;
