const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const BearerStrategy = require('passport-http-bearer');
const queries = require('../db/queries');


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACKURL
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      queries.findUser(profile.id, (err, user) => {
        if (err) {
          done(err);
        }
        if (user && (Array.isArray(user) && user.length !== 0)) {
          done(null, user);
        }
        else {
          queries.addUser(profile.name.givenName, profile.id, accessToken, profile.photos[0].value, (err, results) => {
            if (err) {
              done(err, null);
            } else {
              done(null, results);
              }
          })
        }
      })
    })
  }
));

passport.serializeUser( (user, done) => {
  done(null, user);
});

passport.deserializeUser( (user, done) => {
  done(null, user);
});

module.exports = passport;
