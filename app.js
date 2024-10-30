const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local");
const mongoose = require("mongoose");
// const flash = require("connect-flash");


// Routes
const programRoute = require("./routes/programs");
const articleRoute = require("./routes/articles");
const coursesRoute = require("./routes/courses");

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
// app.use(flash());

app.use("/programs", programRoute);
app.use("/articles", articleRoute);
app.use("/courses",coursesRoute);

app.get("/",(req, res) => {
    res.send("I'm Root ")
})

app.listen(8080, () => {
    console.log("Connected to Mongodb port 8080");
})