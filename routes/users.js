const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../Controllers/users");

router.route("/signup")
    .get(userController.signUpPage)
    .post(wrapAsync(userController.signUp_save));

router.route("/login")
    .get(userController.loginPage)
    .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), wrapAsync(userController.login_save));

router.get("/logout", userController.logout);

module.exports = router;