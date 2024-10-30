const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const programControllers = require("../Controllers/programs");
const { validateProgram } = require("../middleware");
const Program = require("../models/programs");

router.route("/")
    .get(wrapAsync(programControllers.index))
    .post(validateProgram, wrapAsync(programControllers.addProgram))

router.route("/:id")
    .get(wrapAsync(programControllers.show))
    .put(validateProgram, wrapAsync(programControllers.edit_save))
    .delete(wrapAsync(programControllers.delete))

module.exports = router;