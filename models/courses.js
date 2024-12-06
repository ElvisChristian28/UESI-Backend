const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Feedback = require("./feedbacks");
const Video = require("./videos");

const courseSchema = new Schema({
    course_name: String,
    description: String,
    published_date: {
        type: Date,
        default: Date.now()
    },
    instructors: [String],
    videos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
    feedbacks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Feedback'
        }
    ],
    enrollerd_users:[
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

courseSchema.post("findOneAndDelete", async (course) => {
    if (course) {
        await Feedback.deleteMany({ _id: { $in: course.feedbacks } });
        await Video.deleteMany({ _id: { $in: course.videos } });
    }
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;