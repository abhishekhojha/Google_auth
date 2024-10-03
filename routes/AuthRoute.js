const express = require('express')
const router = express.Router()
const AuthController = require("../controllers/AuthController")
router.get("/login",AuthController.Login)
module.exports = router