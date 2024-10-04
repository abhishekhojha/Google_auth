const express = require('express')
const router = express.Router()
const AuthController = require("../controllers/AuthController")
router.get("/logout", AuthController.Logout)
router.get("/google-auth", AuthController.GoogleAuth)
router.get("/google/callback", AuthController.Login)
router.get("/login-redirect", (req, res) => {
    res.redirect("/login")
})
module.exports = router