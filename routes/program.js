const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const programControllers = require("../Controllers/program");

router.route("/")
    .get(wrapAsync(programControllers.index));

module.exports = router;