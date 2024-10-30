const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Feedback = require("./feedbacks");

const courseSchema = new Schema({
    course_name: String,
    description: String,
    published_date: {
        type: Date,
        default: Date.now()
    },
    instructors: [String],
    feedbacks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Feedback'
        }
    ]
    // enrollerd_users
});

courseSchema.post("findOneAndDelete", async (course) => {
    if (course) {
        await Feedback.deleteMany({ _id: { $in: course.feedbacks } });
    }
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;