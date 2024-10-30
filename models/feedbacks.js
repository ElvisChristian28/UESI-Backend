const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const feedbackSchema = new Schema({
    // user_id
    feedback_content: String,
    rating:{
        type: Number,
        min: 1,
        max: 5
    },
    feedback_date: {
        type: Date,
        default: Date.now()
    }
});

const Feedback = mongoose.model('Feedback',feedbackSchema);

module.exports = Feedback;