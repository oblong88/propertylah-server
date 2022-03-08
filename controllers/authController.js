const jwt = require("jsonwebtoken");
const fs = require("fs");
const bcrypt = require("bcrypt");
const { promisify } = require("util");

const authService = require("../services/authService");

class AuthController {
  async signup(req, res, next) {
    try {
      const result = await authService.signup(req.body);

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

  async login(req, res, next) {
    try {
      console.log(req.body.email, req.body.password);
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
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  async logout(req, res, next) {
    // delete cookie or store jwt in blacklist
  }

  async protect(req, res, next) {
    try {
      let token;

      console.log("req.cookies", req.cookies);
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
        throw new Error("You are not logged in! Please log in to get access");

      const result = await authService.protect(token);

      if (result) next();
    } catch (err) {
      res.status(401).json({
        status: "fail",
        message: err.message,
      });
    }
  }
}

module.exports = AuthController;
