const express = require("express")
const router = express.Router()
const {home,userRegister,userLogin}= require("../controller/auth-controller")
const {verifyUser} = require("../controller/verification-controller")

router.route("/").get(home)
router.route("/register").post(userRegister)
router.route("/login").post(userLogin)
router.route("/verify").post(verifyUser)
router.route("/login").post(userLogin)

module.exports = router