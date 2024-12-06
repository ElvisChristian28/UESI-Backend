const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { validateVideo, isLoggedin, isAdmin } = require("../middleware");
const videoControllers = require("../Controllers/videos");

// ADD Video
router.post("/videos",isLoggedin, validateVideo, isAdmin, wrapAsync(videoControllers.addCourseVideo));

//DELETE Video
router.delete("/videos/:videoId",isLoggedin, isAdmin, wrapAsync(videoControllers.deleteCourseVideo));

module.exports = router;