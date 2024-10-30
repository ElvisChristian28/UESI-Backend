const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Feedback = require("./feedbacks");

const articleSchema = new Schema({
    title: String,
    // author_id or user id
    content: String,
    published_date:{
        type:Date,
        default:Date.now()
    },
    feedbacks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Feedback'
        }
    ]
});

articleSchema.post("findOneAndDelete", async (article) => {
    if (article) {
        await Feedback.deleteMany({ _id: { $in: article.feedbacks } });
    }
});

const Article = mongoose.model('Article',articleSchema);

module.exports = Article;