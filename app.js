if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}

const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const mongoose = require("mongoose");
const flash = require("connect-flash");
// const Login = require("./models/login");
const User = require("./models/user");
const ejsmate = require("ejs-mate");


// Routes
const programRoute = require("./routes/programs");
const articleRoute = require("./routes/articles");
const coursesRoute = require("./routes/courses");
const feedbackRoute = require("./routes/feedbacks");
const videoRoute = require("./routes/videos");
const userRoute = require("./routes/users");

async function main() {
    await mongoose.connect("mongodb://localhost:27017/UESI");
}

main().then(() => {
    console.log("Connected to db");
})
.catch((err) => {
    console.log(err);
})

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsmate);

const sessionOption = {
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        exprires : Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 Days 
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    }
};

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.use("/programs", programRoute);
app.use("/articles", articleRoute);
app.use("/courses",coursesRoute);
app.use("/", feedbackRoute);
app.use("/courses/:id",videoRoute);
app.use("/", userRoute);

app.get("/",(req, res) => {
    res.send("I'm Root ")
});

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
    let { status = 500, message = "An error Occur" } = err;
    // res.status(status);

    // res.status(status).render("listings/error.ejs", { message }); USE THIS
    res.status(status);// MY CODE THERE IS AN ERROR PLEASE DON'T USE THIS 
    if(message === "Page Not Found!"){
        res.send("Page Not Found!");
    }
    else{
        console.log(`This is the message [app.js:95] ${message}`);
    }
});

app.listen(8080, () => {
    console.log("conneted to 8080");
});