const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Feedback = require("./feedbacks");

const programSchema = new Schema({
    program_name: String,
    description: String,
    start_date: Date,
    end_date: Date,
    program_status:String,
    location:String,
    feedbacks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Feedback'
        }
    ],
    registeredUsers:[
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

programSchema.post("findOneAndDelete", async (program) => {
    if (program) {
        await Feedback.deleteMany({ _id: { $in: program.feedbacks } });
    }
});
const Program = mongoose.model('Program',programSchema);

module.exports = Program;