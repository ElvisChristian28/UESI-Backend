const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    title: String,
    description: String,
    filename:{
        type: String,
        default: "courseVideo"
    },
    url: String,
    uploaded_date: {
        type: Date,
        default: Date.now()
    },
});


const Video = mongoose.model("Video", videoSchema);

module.exports = Video;