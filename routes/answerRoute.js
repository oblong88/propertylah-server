const express = require("express");

const AnswerController = require("../controllers/answerController");

const answerController = new AnswerController();

const router = express.Router();

router
  .route("/")
  .post(answerController.createAnswer)
  .get(answerController.getAllAnswers);

router
  .route("/:id")
  .get(answerController.getAnswer)
  .patch(answerController.updateAnswer)
  .delete(answerController.deleteAnswer);

module.exports = router;
