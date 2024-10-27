const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const programSchema = new Schema({
    program_name: String,
    description: String,
    start_date: Date,
    end_date: Date,
    program_status:String,
    location:String
    // feedback_reviced
    // /enrollerd_users
})

const Program = mongoose.model('Program',programSchema);

module.exports = Program;