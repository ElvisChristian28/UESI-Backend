const ExpressError = require("../utils/ExpressError");
const Article = require("../models/articles");

module.exports.index = async (req, res) => {
    const allArticle = await Article.find({});
    res.json(allArticle);
}

module.exports.addArticle = async (req,res) => {
    if(!req.body.article){
        throw new ExpressError(400, "Send valid data for articles");
    }
    const newarticle = new Article(req.body.article);
    let savedarticle = await newarticle.save();
    console.log(savedarticle);
    // req.flash("success", "Article Created Successfully!!");
    res.redirect("/articles");
}

module.exports.show = (async (req, res) => {
    let { id } = req.params;
    const article = await Article.findById(id).populate("feedbacks");
    if (!article) {
        // req.flash("error", "This article Doesn't Exist");
        console.log("Error");
        res.redirect("/articles");
    }
    else {
        res.json(article);
    }
});

module.exports.edit_save = (async (req, res) => {

    if (!req.body.article) {
        throw new ExpressError(400, "Send valid data for articles");
    }

    let { id } = req.params;
    let article = await Article.findByIdAndUpdate(id, { ...req.body.article });
    let saved = await article.save();
    console.log(saved)
    // console.log({ ...req.body.article });
    // req.flash("success", "article Updated!");
    res.redirect("/articles");
    // res.json(newarticle);
});

module.exports.delete = (async (req, res) => {
    let { id } = req.params;
    let deleted = await Article.findByIdAndDelete(id);
    console.log(deleted);
    // req.flash("success", "Listing Deleted!");
    res.redirect("/articles");
});

