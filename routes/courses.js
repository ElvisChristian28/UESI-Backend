const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const courseControllers = require("../Controllers/courses");
const { validateCourse } = require("../middleware");
const Course = require("../models/courses");

router.route("/")
    .get(wrapAsync(courseControllers.index))
    .post(validateCourse, wrapAsync(courseControllers.addCourse))

router.route("/:id")
    .get(wrapAsync(courseControllers.show))
    .put(validateCourse, wrapAsync(courseControllers.edit_save))
    .delete(wrapAsync(courseControllers.delete))

module.exports = router;