const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/User")
const dotenv = require('dotenv');
dotenv.config()
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/google/callback"
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            let user = await User.findOne({ googleId: profile.id })
            if (!user) {
                user = new User({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value
                })
                await user.save()
            }
            return done(null, user);
        } catch (error) {
            return done(error, null)
        }
    }
));

// Serialize user into the sessions
passport.serializeUser(function (user, done) { done(null, user.id) });

// Deserialize user from the session
passport.deserializeUser(function (id, done) {
    // User.findById(id, (err, user) => done(err, user));
    User.findById(id)
        .then(user => done(null, user))
        .catch(err => done(err));
});