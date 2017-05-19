const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const BearerStrategy = require('passport-http-bearer');
const queries = require('../db/queries');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:8080/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('Logging profile info from PassportHelper', profile);
    process.nextTick(() => {
      queries.findUser(profile.id, (err, user) => {
        console.log('user from queries.findUser', user);
        if (err) {
          done(err);
        }
        if (user && (Array.isArray(user) && user.length !== 0)) {
          done(null, user);
        }
        else {
          queries.addUser(profile.name.givenName, profile.id, accessToken, (err, results) => {
            if (err) {
              done(err, null);
            } else {
              console.log('RESULTS FROM QUERIES.ADDUSER', results)
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

