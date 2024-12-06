const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const courseControllers = require("../Controllers/courses");
const { validateCourse, isLoggedin } = require("../middleware");
const Course = require("../models/courses");

router.route("/")
    .get(wrapAsync(courseControllers.index))
    .post(isLoggedin, validateCourse, wrapAsync(courseControllers.addCourse))

router.route("/:id")
    .get(wrapAsync(courseControllers.show))
    .put(isLoggedin, validateCourse, wrapAsync(courseControllers.edit_save))
    .delete(isLoggedin, wrapAsync(courseControllers.delete))

module.exports = router;