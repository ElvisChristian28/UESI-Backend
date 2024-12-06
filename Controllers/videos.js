const Course = require("../models/courses");
const Video = require("../models/videos");

module.exports.addCourseVideo = (async (req, res) => {
    let course = await Course.findById(req.params.id);
    let newVideo = new Video(req.body.video);
    console.log(course);
    console.log(newVideo);
    // console.log(req.user._id);
    // newVideo.author = req.user._id;
    course.videos.push(newVideo);
    await newVideo.save();
    await course.save();
    req.flash("success","Video Save Successfully!!");
    res.redirect(`/courses/${course._id}`);
});

module.exports.deleteCourseVideo = (async (req, res) => {
    let { id, videoId } = req.params;
    await Course.findByIdAndUpdate(id, { $pull: { videos: videoId } });
    await Video.findByIdAndDelete(videoId);
    req.flash("success","Video Deleted!");
    res.redirect(`/courses/${id}`);
});