const ExpressError = require("../utils/ExpressError");
const Program = require("../models/programs");

module.exports.index = async (req, res) => {
    const allProgram = await Program.find({});
    res.json(allProgram);
}

module.exports.addProgram = async (req,res) => {
    if(!req.body.program){
        throw new ExpressError(400, "Send valid data for programs");
    }
    const newprogram = new Program(req.body.program);
    let savedprogram = await newprogram.save();
    console.log(savedprogram);
    req.flash("success", "Program Created Successfully!!");
    res.redirect("/programs");
}

module.exports.show = (async (req, res) => {
    let { id } = req.params;
    const program = await Program.findById(id).populate({ path: "feedbacks", populate: {path: "author",}, });
    if (!program) {
        req.flash("error", "This program Doesn't Exist");
        console.log("Error");
        res.redirect("/programs");
    }
    else {
        res.json(program);
    }
});

module.exports.edit_save = (async (req, res) => {

    if (!req.body.program) {
        throw new ExpressError(400, "Send valid data for programs");
    }

    let { id } = req.params;
    let program = await Program.findByIdAndUpdate(id, { ...req.body.program });
    await program.save();
    // console.log({ ...req.body.program });
    req.flash("success", "program Updated!");
    // res.redirect("/programs");
    res.json(newprogram);
});

module.exports.delete = (async (req, res) => {
    let { id } = req.params;
    await Program.findByIdAndDelete(id);
    req.flash("success", "Program Deleted!");
    res.redirect("/programs");
});

module.exports.newPage = (req, res) => {
    // res.render("listings/new.ejs");
    console.log(req.user);
    res.send("Render new page hereeeee for PROGRAMS");
};

module.exports.editPage = (async (req, res) => {
    let { id } = req.params;
    const article = await Article.findById(id);
    if (!article) {
        req.flash("error", "This Listing Doesn't Exist");
        res.redirect("/listings");
    }
    else {
        console.log(req.user);
        res.send("Render edittttt page here for PROGRAMS");
    }
});

module.exports.registeredUsers = async (req, res) => {
    let program = await Program.findById(req.params.id);
    program.registeredUsers.push(req.user._id);
    await program.save();
    res.redirect(`/programs/${req.params.id}`);
}