const passport = require("passport");
const googleOauthModel = require("../models/googleOauthModel");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  googleOauthModel.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_GOOGLE_ID,
      clientSecret: process.env.OAUTH_GOOGLE_SECRET,
      callbackURL: process.env.OAUTH_GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
      proxy: true,
    },
    (accessToken, refreshToken, profile, next) => {
      googleOauthModel.findOne({ email: profile._json.email }).then((user) => {
        if (user) {
          next(null, user);
        } else {
          googleOauthModel
            .create({
              photo: profile._json.picture,
              username: profile.username,
              name: profile.displayName,
              email: profile._json.email,
              googleId: profile.id,
            })
            .then((user) => {
              next(null, user);
            })
            .catch((error) => {
              return next(new Error(error));
            });
        }

        next(null, user);
      });
    }
  )
);
