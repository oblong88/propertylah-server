// const questionService = require("../services/questionService");

class QuestionController {
  async createQuestion(req, res, next) {
    try {
      const result = await questionService.createQuestion(req.body);
      res.status(200).json({
        status: "success",
        data: result,
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  async getQuestion(req, res, next) {
    try {
      const id = +req.params.id;
      if (!id) throw new Error("Invalid id");

      const result = await questionService.getQuestion(+req.params.id);
      res.status(200).json({
        status: "success",
        data: result,
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  async getAllQuestions(req, res, next) {
    try {
      const result = await questionService.getAllQuestions();

      res.status(200).json({
        status: "success",
        results: result.length,
        data: result,
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  async updateQuestion(req, res, next) {
    try {
      const id = +req.params.id;
      if (!id) throw new Error("Invalid id");

      const result = await questionService.updateQuestion(id, req.body);

      res.status(200).json({
        status: "success",
        data: result,
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  async deleteQuestion(req, res, next) {
    try {
      const id = +req.params.id;
      if (!id) throw new Error("Invalid id");

      await questionService.deleteQuestion(id);

      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err.message,
      });
    }
  }
}

module.exports = QuestionController;
