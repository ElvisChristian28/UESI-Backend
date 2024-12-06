const wrapAsync = require("./utils/wrapAsync");
const Article = require("./models/articles");
const Feedback = require("./models/feedbacks");
const Course = require("./models/courses");
const Program = require("./models/programs");
const { articleSchema, courseSchema, programSchema, feedbackSchema, videoSchema } = require("./schema");
const ExpressError = require("./utils/ExpressError");

module.exports.validateArticle = (req, res, next) => {
    const result = articleSchema.validate(req.body);
    let { error } = result;
    // console.log(result);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
};

module.exports.validateCourse = (req, res, next) => {
    const result = courseSchema.validate(req.body);
    let { error } = result;
    // console.log(result);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
};

module.exports.validateProgram = (req, res, next) => {
    const result = programSchema.validate(req.body);
    let { error } = result;
    // console.log(result);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
};

module.exports.validateFeedback = (req,res,next) => {
    const result = feedbackSchema.validate(req.body);
    let {error} = result;
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
};

module.exports.validateVideo = (req,res,next) => {
    const result = videoSchema.validate(req.body);
    let {error} = result;
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
};

module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next();
};

module.exports.isLoggedin = (req,res,next)  => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in");
        res.redirect("/login");
    }
    next();
}

module.exports.isOwnerArticle = wrapAsync( async(req,res,next) => {
    let { id } = req.params;
    let article = await Article.findById(id);
    console.log(req.user);
    if(!article.author.equals(req.user._id)){
        req.flash("error",`You don't have Permisson of ${article.title}`);
        return res.redirect(`/articles/${id}`);
    }
    next();
});

module.exports.isFeedbackAuthor = wrapAsync( async(req,res,next) => {
    let { feedbackId } = req.params;
    let feedback = await Feedback.findById(feedbackId);
    if(!feedback.author.equals(req.user._id)){
        req.flash("error",`You don't have Permission to delete this review`);
        return res.redirect(`/programs`);
    }
    next();
});

module.exports.isAdmin = wrapAsync(async (req, res, next) => {
    // Check the `isAdmin` field
    if (!req.user.isAdmin) {
        req.flash("error",`You don't have Permission to delete this.`);
        return res.redirect(`/programs`);
    }
    next();
});