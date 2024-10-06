const passport = require('passport');
require("../config/passport")
const dotenv = require('dotenv');
dotenv.config()
async function Login(req, res, next) {
    passport.authenticate("google", function (err, userData, info) {
        if (err)
            return res.status(500).json({ message: "Internal Server Error" })
        if (!userData)
            return res.status(401).json({ message: "Invalid Credential or user denied access" })
        req.logIn(userData, (err) => {
            if (err)
                res.redirect("http://localhost:3000/error?err="+err)
            return res.redirect("http://localhost:3000/dash?name="+userData.name)
        })
    })(req, res, next)
}
const GoogleAuth = passport.authenticate('google', { scope: ['profile', 'email'] })
function Logout(req, res) {
    res.Logout(() => {
        res.redirect("/")
    })
}
module.exports = { Logout, GoogleAuth, Login }