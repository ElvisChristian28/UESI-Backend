const ExpressError = require("../utils/ExpressError");
const Article = require("../models/articles");

module.exports.index = async (req, res) => {
    const allArticle = await Article.find({});
    res.json(allArticle);
}

module.exports.addArticle = async (req, res) => {
    if (!req.body.article) {
        throw new ExpressError(400, "Send valid data for articles");
    }
    const newArticle = new Article(req.body.article);
    newArticle.author = req.user._id;
    console.log(newArticle);
    let savedarticle = await newArticle.save();
    console.log(savedarticle);
    req.flash("success", "Article Created Successfully!!");
    res.redirect("/articles");
}


module.exports.show = (async (req, res) => {
    let { id } = req.params;
    const article = await Article.findById(id).populate({ path: "feedbacks", populate: {path: "author",}, }).populate("author");
    if (!article) {
        req.flash("error", "This article Doesn't Exist");
        console.log("Error");
        res.redirect("/articles");
    }
    else {
        res.json(article);
    }
});

module.exports.edit_save = (async (req, res) => {
    console.log(req.user);
    if (!req.body.article) {
        throw new ExpressError(400, "Send valid data for articles");
    }

    let { id } = req.params;
    let article = await Article.findByIdAndUpdate(id, { ...req.body.article });
    let saved = await article.save();
    console.log(saved)
    // console.log({ ...req.body.article });
    req.flash("success", "Article Updated!");
    res.redirect("/articles");
    // res.json(newarticle);
});

module.exports.delete = (async (req, res) => {
    let { id } = req.params;
    let deleted = await Article.findByIdAndDelete(id);
    console.log(deleted);
    req.flash("success", "Article Deleted!");
    res.redirect("/articles");
});

module.exports.newPage = (req, res) => {
    // res.render("listings/new.ejs");
    console.log(req.user);
    // console.log(...req.login);
    res.send("Render new page hereeeee for ARTICLES");
};

module.exports.editPage = (async (req, res) => {
    let { id } = req.params;
    const article = await Article.findById(id);
    if (!article) {
        req.flash("error", "This Listing Doesn't Exist");
        res.redirect("/articles");
    }
    else {
        console.log(req.user);
        res.send("Render edittttt page here for ARTICLES");
    }
}); 
