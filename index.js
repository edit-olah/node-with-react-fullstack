const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require('./config/keys');

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    }, 
    accessToken => {
      console.log(accessToken);
    }
  )
);

app.get(
  '/auth/google', 
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login']
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT);