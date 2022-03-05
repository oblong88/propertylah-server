const express = require("express");

const QuestionController = require("../controllers/questionController");

const questionController = new QuestionController();

const router = express.Router();

router
  .route("/")
  .post(questionController.createQuestion)
  .get(questionController.getAllQuestions);

router
  .route("/:id")
  .get(questionController.getQuestion)
  .patch(questionController.updateQuestion)
  .delete(questionController.deleteQuestion);

module.exports = router;
