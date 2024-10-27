const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const articleControllers = require("../Controllers/articles");
const Article = require("../models/articles");

router.route("/")
    .get(wrapAsync(articleControllers.index))
    .post(wrapAsync(articleControllers.addArticle))

router.route("/:id")
    .get(wrapAsync(articleControllers.show))
    .put(wrapAsync(articleControllers.edit_save))
    .delete(wrapAsync(articleControllers.delete))

module.exports = router;