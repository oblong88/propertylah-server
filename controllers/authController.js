const jwt = require("jsonwebtoken");
const fs = require("fs");
const bcrypt = require("bcrypt");

class AuthController {
  async signup(req, res, next) {}

  async login(req, res, next) {}

  async logout(req, res, next) {}

  async protect(req, res, next) {}
}

module.exports = AuthController;
