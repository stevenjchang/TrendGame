const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const queries = require('../db/queries');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:8080/auth/google/callback"
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log('Logging profile info from PassportHelper', profile);
    process.nextTick( () => {
      queries.addUser(profile.id, (err, results) => {
        if (err) {
          cb(err, null);
        }
        else {
          cb(null, profile);
        }
      })
    })
  }
));

passport.serializeUser( (user, done) => {
  done(null, user.id);
});

passport.deserializeUser( (id, done) => {
  // User.findById(id, (err, user) => { done(err, user); })
  done(user.id, null);
})

module.exports = passport;

