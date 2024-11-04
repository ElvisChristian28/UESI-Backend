const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync");
const { validateVideo } = require("../middleware");
const videoControllers = require("../Controllers/videos");

// ADD REVIEW
router.post("/videos",validateVideo,wrapAsync(videoControllers.addCourseVideo));

//DELETE REVIEW
router.delete("/videos/:videoId",wrapAsync(videoControllers.deleteCourseVideo));

module.exports = router;