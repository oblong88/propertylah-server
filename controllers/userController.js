const userService = require("../services/userService");

class UserController {
  async createUser(req, res, next) {
    try {
      const result = await userService.createUser(req.body);

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

  async getUser(req, res, next) {
    try {
      const id = +req.params.id;
      if (!id) throw new Error("Invalid id");

      const result = await userService.getUser(+req.params.id);
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

  async getAllUsers(req, res, next) {
    try {
      const result = await userService.getAllUsers();

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

  async updateUser(req, res, next) {
    try {
      const id = +req.params.id;
      if (!id) throw new Error("Invalid id");

      const result = await userService.updateUser(id, req.body);

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

  async deleteUser(req, res, next) {
    try {
      const id = +req.params.id;
      if (!id) throw new Error("Invalid id");

      await userService.deleteUser(id);

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

module.exports = UserController;
