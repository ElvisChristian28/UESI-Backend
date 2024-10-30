const wrapAsync = require("./utils/wrapAsync");
const Article = require("./models/articles");
const Feedback = require("./models/feedbacks");
const Course = require("./models/courses");
const Program = require("./models/programs");
const { articleSchema, courseSchema, programSchema, feedbackSchema } = require("./schema");
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