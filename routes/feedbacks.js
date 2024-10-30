const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync");
const { validateFeedback } = require("../middleware");
const feedbackControllers = require("../Controllers/feedbacks");

// ADD REVIEW
router.post("/programs/:id/feedbacks",validateFeedback,wrapAsync(feedbackControllers.addProgramFeedback));
router.post("/articles/:id/feedbacks",validateFeedback,wrapAsync(feedbackControllers.addArticleFeedback));
router.post("/courses/:id/feedbacks",validateFeedback,wrapAsync(feedbackControllers.addCourseFeedback));

//DELETE REVIEW
router.delete("/programs/:id/feedbacks/:feedbackId",wrapAsync(feedbackControllers.deleteProgramFeedback));
router.delete("/articles/:id/feedbacks/:feedbackId",wrapAsync(feedbackControllers.deleteArticleFeedback));
router.delete("/courses/:id/feedbacks/:feedbackId",wrapAsync(feedbackControllers.deleteCourseFeedback));

module.exports = router;