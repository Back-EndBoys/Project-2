var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var keys = require('./keys');
var db = require('../models');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.UserName.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile.id);
        console.log(profile.displayName);
        db.UserName.create({
            name: profile.displayName,
            googleID: profile.id
        }).then(function (newUser) {
            console.log('created new user: ', newUser);
            done(null, newUser);
        })
    })
);
