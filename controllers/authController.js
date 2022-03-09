const jwt = require("jsonwebtoken");
const fs = require("fs");
const bcrypt = require("bcrypt");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");

const authService = require("../services/authService");
const AppError = require("../utils/appError");

class AuthController {
  // async signup(req, res, next) {
  //   try {
  //     const result = await authService.signup(req.body);

  //     res.status(200).json({
  //       status: "success",
  //       data: result,
  //     });
  //   } catch (err) {
  //     res.status(404).json({
  //       status: "fail",
  //       message: err.message,
  //     });
  //   }
  // }
  signup = catchAsync(async (req, res, next) => {
    if (!req.body)
      return next(new AppError("No data provided for new user", 400));

    const result = await authService.signup(req.body);

    res.status(200).json({
      status: "success",
      data: result,
    });
  });

  login = catchAsync(async (req, res, next) => {
    if (!req.body.email || !req.body.password)
      return next(new AppError("Email and password cannot be blank", 400));

    const result = await authService.login(req.body.email, req.body.password);

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.cookie("jwt", result.dataValues.token, cookieOptions);

    res.status(200).json({
      status: "success",
      data: result,
    });
  });
  // async login(req, res, next) {
  //   try {
  //     console.log(req.body.email, req.body.password);
  //     const result = await authService.login(req.body.email, req.body.password);

  //     const cookieOptions = {
  //       expires: new Date(
  //         Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  //       ),
  //       httpOnly: true,
  //     };

  //     res.cookie("jwt", result.dataValues.token, cookieOptions);

  //     res.status(200).json({
  //       status: "success",
  //       data: result,
  //     });
  //   } catch (err) {
  //     res.status(404).json({
  //       status: "fail",
  //       message: err.message,
  //     });
  //   }
  // }

  async logout(req, res, next) {
    // delete cookie or store jwt in blacklist
  }

  protect = catchAsync(async (req, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.jwt) {
      // FIXME: cookies issue
      console.log(req.cookies);
      token = req.cookies.jwt;
    }

    if (!token)
      return next(
        new AppError("You are not logged in! Please log in to get access", 401)
      );

    const result = await authService.protect(token);

    if (result) next();
  });
}

module.exports = AuthController;
