// const Login = require("../models/login");
// const Registration = require("../models/registration");
const User = require("../models/user");

module.exports.signUpPage = (req, res) => {
    // res.render("users/signup.ejs");
    res.send("Render a SignUp form here...");
};

module.exports.signUp_save = async (req, res, next) => {
    try {
        const { email, username, password, first_name, last_name, phone_number, address, gender, pincode } = req.body;
        const newUser = new User({ email, username, first_name, last_name, phone_number, address, gender, pincode });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to UESI!");
            res.redirect("/programs");
        });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};

module.exports.loginPage = (req, res) => {
    // res.render("users/login.ejs");
    res.send("Render a Login Page form here...");
}

module.exports.login_save = async (req, res) => {
    req.flash("success", "Welcome back to UESI!");
    let redirectUrl = res.locals.redirectUrl || "/programs";
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are Logged out now!");
        res.redirect("/programs");
    })
};