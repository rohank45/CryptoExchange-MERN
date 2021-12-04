const googleIsLogin = (req, res, next) => {
  if (!req.user) {
    res.redirect("/");
    return res.status(401).json({ message: "Login first to access this page" });
  }

  next();
};

module.exports = googleIsLogin;
