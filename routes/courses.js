const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const courseControllers = require("../Controllers/courses");
const { validateCourse, isLoggedin, isAdmin } = require("../middleware");
const Course = require("../models/courses");

router.route("/")
    .get(wrapAsync(courseControllers.index))
    .post(isLoggedin, validateCourse, isAdmin, wrapAsync(courseControllers.addCourse))

router.route("/:id")
    .get(wrapAsync(courseControllers.show))
    .put(isLoggedin, validateCourse, isAdmin, wrapAsync(courseControllers.edit_save))
    .delete(isLoggedin, isAdmin, wrapAsync(courseControllers.delete))

router.route("/:id/enrolledment")
    .get(wrapAsync(courseControllers.enrolledment))

module.exports = router;