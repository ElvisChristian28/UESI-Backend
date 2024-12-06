const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const articleControllers = require("../Controllers/articles");
const { validateArticle, isLoggedin, isOwnerArticle } = require("../middleware");
const Article = require("../models/articles");

router.route("/")
    .get(wrapAsync(articleControllers.index))
    .post(validateArticle, isLoggedin, wrapAsync(articleControllers.addArticle))

router.get("/new", isLoggedin, wrapAsync(articleControllers.newPage));

router.route("/:id")
    .get(wrapAsync(articleControllers.show))
    .put(isLoggedin, validateArticle, isOwnerArticle, wrapAsync(articleControllers.edit_save))
    .delete(isLoggedin, isOwnerArticle, wrapAsync(articleControllers.delete));

router.get("/:id/edit", isLoggedin, isOwnerArticle, wrapAsync(articleControllers.editPage));

module.exports = router;