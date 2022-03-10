const answerService = require("../services/answerService");

class AnswerController {
  async createAnswer(req, res, next) {
    try {
      const result = await answerService.createAnswer(req.body);

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
    // res.send("This route is not defined yet");
  }

  async getAnswer(req, res, next) {
    try {
      const id = +req.params.id;
      if (!id) throw new Error(`Invalid Answer ID ${id}`);

      const result = await answerService.getAnswer(+req.params.id);
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
    // res.send("This route is not defined yet");
  }

  async getAllAnswers(req, res, next) {
    try {
      const result = await answerService.getAllAnswers(req.query);

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
    // res.send("This route is not defined yet");
  }

  async updateAnswer(req, res, next) {
    try {
      const id = +req.params.id;
      if (!id) throw new Error(`Invalid answer ID ${id}`)
      const result = await answerService.updateAnswer(id, req.body);

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
    // res.send("This route is not defined yet");
  }

  async deleteAnswer(req, res, next) {
    try {
      const id = +req.params.id;
      if (!id) throw new Error(`Invalid answer ID ${id}`);

      await answerService.deleteAnswer(id);

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
    // res.send("This route is not defined yet");
  }
}

module.exports = AnswerController;
