const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const programControllers = require("../Controllers/program");
const Program = require("../models/programs");

router.route("/")
    .get(wrapAsync(programControllers.index))
    .post(wrapAsync(programControllers.addProgram))

router.route("/:id")
    .get(wrapAsync(programControllers.show))
    .put(wrapAsync(programControllers.edit_save))
    .delete(wrapAsync(programControllers.delete))

module.exports = router;