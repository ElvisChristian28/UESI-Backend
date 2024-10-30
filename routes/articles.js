const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const articleControllers = require("../Controllers/articles");
const { validateArticle } = require("../middleware");
const Article = require("../models/articles");

router.route("/")
    .get(wrapAsync(articleControllers.index))
    .post(validateArticle, wrapAsync(articleControllers.addArticle))

router.route("/:id")
    .get(wrapAsync(articleControllers.show))
    .put(validateArticle, wrapAsync(articleControllers.edit_save))
    .delete(wrapAsync(articleControllers.delete))

module.exports = router;