const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    // author_id
    content: String,
    published_date:{
        type:Date,
        default:Date.now()
    },
    // feedback_reviced
})

const Article = mongoose.model('Article',articleSchema);

module.exports = Article;