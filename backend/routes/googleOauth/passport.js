const passport = require("passport");
const googleUser = require("../../models/googleOauthModel");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  await googleUser.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_GOOGLE_ID,
      clientSecret: process.env.OAUTH_GOOGLE_SECRET,
      callbackURL: process.env.OAUTH_GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, next) => {
      googleUser.findOne({ email: profile._json.email }).then((user) => {
        if (user) {
          next(null, user);
        } else {
          googleUser
            .create({
              photo: profile._json.picture,
              name: profile._json.name,
              email: profile._json.email,
              googleId: profile.id,
            })
            .then((user) => {
              next(null, user);
            })
            .catch((error) => {
              console.log(error.message);
            });
        }

        next(null, user);
      });
    }
  )
);
