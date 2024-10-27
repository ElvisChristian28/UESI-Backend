const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    course_name: String,
    description: String,
    published_date:{
        type:Date,
        default:Date.now()
    },
    
    course_status: String,
    // feedback_reviced
    // /enrollerd_users
})