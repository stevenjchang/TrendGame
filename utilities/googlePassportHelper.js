const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.ROOT_URL + "/auth/google/callback"
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log('Logging profile info from PassportHelper', profile);
    //User.findOrCreate({ googleID: profile.id})
    cb(null, profile);
  }
));

passport.serializeUser( (user, done) => {
  done(null, user.id);
});

passport.deserializeUser( (id, done) => {
  //User.findById(id, (err, user) => { done(err, user); })
})

module.exports.passport = passport;

