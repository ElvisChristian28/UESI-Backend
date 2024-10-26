const ExpressError = require("../utils/ExpressError");
const Program = require("../models/programs");

module.exports.index = async (req, res) => {
    const allProgram = await Program.find({});
    res.json(allProgram);
}