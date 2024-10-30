const ExpressError = require("../utils/ExpressError");
const Course = require("../models/courses");

module.exports.index = async (req, res) => {
    const allCourse = await Course.find({});
    res.json(allCourse);
}

module.exports.addCourse = async (req,res) => {
    if(!req.body.course){
        throw new ExpressError(400, "Send valid data for courses");
    }
    const newcourse = new Course(req.body.course);
    let savedcourse = await newcourse.save();
    console.log(savedcourse);
    // req.flash("success", "Course Created Successfully!!");
    res.redirect("/courses");
}

module.exports.show = (async (req, res) => {
    let { id } = req.params;
    const course = await Course.findById(id).populate("feedbacks");
    if (!course) {
        // req.flash("error", "This course Doesn't Exist");
        console.log("Error");
        res.redirect("/courses");
    }
    else {
        console.log(course);
        res.json(course);
    }
});

module.exports.edit_save = (async (req, res) => {

    if (!req.body.course) {
        throw new ExpressError(400, "Send valid data for courses");
    }

    let { id } = req.params;
    let course = await Course.findByIdAndUpdate(id, { ...req.body.course });
    let saved = await course.save();
    console.log(saved)
    // console.log({ ...req.body.course });
    // req.flash("success", "course Updated!");
    res.redirect("/courses");
    // res.json(newcourse);
});

module.exports.delete = (async (req, res) => {
    let { id } = req.params;
    let deleted = await Course.findByIdAndDelete(id);
    console.log(deleted);
    // req.flash("success", "Listing Deleted!");
    res.redirect("/courses");
});

