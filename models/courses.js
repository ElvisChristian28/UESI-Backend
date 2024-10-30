const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    course_name: String,
    description: String,
    published_date:{
        type:Date,
        default:Date.now()
    },
    instructors: [String]
    // feedback_reviced
    // enrollerd_users
})

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;