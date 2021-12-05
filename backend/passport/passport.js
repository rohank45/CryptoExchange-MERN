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
      proxy: true,
    },
    (accessToken, refreshToken, profile, next) => {
      console.log(profile);

      googleOauthModel
        .findOne({ googleId: profile.id })
        .then((existingUser) => {
          if (existingUser) {
            next(null, existingUser);
          } else {
            googleOauthModel
              .create({
                googleId: profile.id,
                username: profile.displayName,
                name: profile.displayName,
                email: profile._json.email,
                photo: profile._json.picture,
              })
              .then((user) => {
                next(null, user);
              })
              .catch((error) => {
                console.log(error);
              });
          }

          next(null, user);
        });
    }
  )
);
