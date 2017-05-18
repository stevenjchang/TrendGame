const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const queries = require('../db/queries');


// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: "http://127.0.0.1:8080/auth/google/callback"
//   },
//   (accessToken, refreshToken, profile, cb) => {
//     console.log('Logging profile info from PassportHelper', profile);
//     // process.nextTick( () => {
//       queries.findUser(profile.id, (err, user) => {
//         console.log('user from queries.findUser', user);
//           queries.addUser(profile.name.givenName, profile.id, (err, results) => {
//             if (err) {
//               cb(err, null);
//               } else {
//               cb(null, results);
//               }
//           })       
//       })
//     // })
//   }
// ));

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
        if (user) {
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
  console.log('user from serializeUser', user);
  done(null, user);
});

passport.deserializeUser( (id, done) => {
  queries.findUser(id, (err, user) => {
    console.log('result user from findUser', user)
    done(err, user.id);
  })
})

module.exports = passport;

