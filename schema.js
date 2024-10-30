const Joi = require('joi');

module.exports.programSchema = Joi.object({
    program: Joi.object({
        program_name: Joi.string().required(),
        description: Joi.string().required(),
        start_date: Joi.date().required(),
        end_date: Joi.date().required(),
        program_status: Joi.string().required(),
        location: Joi.string().required(),
    }).required(),
});

module.exports.courseSchema = Joi.object({
    course: Joi.object({
        course_name: Joi.string().required(),
        description: Joi.string().required(),
        instructors: Joi.array().items(Joi.string()).required(),
    }).required(),
});

module.exports.articleSchema = Joi.object({
    article: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
    }).required(),
});

module.exports.feedbackSchema = Joi.object({
    feedback: Joi.object({
        content: Joi.string().required(),
        rating: Joi.number().min(1).max(5).required(),
    }).required(),
});