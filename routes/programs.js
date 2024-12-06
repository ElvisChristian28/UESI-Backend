const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const programControllers = require("../Controllers/programs");
const { validateProgram, isLoggedin } = require("../middleware");
const Program = require("../models/programs");

router.route("/")
    .get(wrapAsync(programControllers.index))
    .post(isLoggedin, validateProgram, wrapAsync(programControllers.addProgram))

router.route("/:id")
    .get(wrapAsync(programControllers.show))
    .put(isLoggedin, validateProgram, wrapAsync(programControllers.edit_save))
    .delete(isLoggedin, wrapAsync(programControllers.delete));

// router.get("/:id/edit", wrapAsync(programControllers.));

module.exports = router;