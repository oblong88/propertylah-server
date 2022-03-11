const userService = require("../services/userService");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

class UserController {
  createUser = catchAsync(async (req, res, next) => {
    const result = await userService.createUser(req.body);

    res.status(200).json({
      status: "success",
      data: result,
    });
  });

  getUser = catchAsync(async (req, res, next) => {
    const id = +req.params.id;

    if (!id) return next(new AppError("Invalid id", 400));

    const result = await userService.getUser(+req.params.id);

    if (!result) return next(new AppError("No user found", 404));

    res.status(200).json({
      status: "success",
      data: result,
    });
  });

  getAllUsers = catchAsync(async (req, res, next) => {
    const result = await userService.getAllUsers(req.query);

    res.status(200).json({
      status: "success",
      results: result.length,
      data: result,
    });
  });

  updateUser = catchAsync(async (req, res, next) => {
    const id = +req.params.id;
    if (!id) throw new AppError("Invalid id", 400);

    if (Object.keys(req.body).length === 0)
      throw new AppError("No data entered", 400);

    const result = await userService.updateUser(id, req.body);

    res.status(200).json({
      status: "success",
      data: result,
    });
  });

  deleteUser = catchAsync(async (req, res, next) => {
    const id = +req.params.id;
    if (!id) return next(new AppError("Invalid id", 400));

    await userService.deleteUser(id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
}

module.exports = UserController;
