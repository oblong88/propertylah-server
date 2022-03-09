const AppError = require("../utils/appError");

// Global error handler middleware
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // unknown error: don't leak details to client

    // 1) Log error
    // use winston logger here!
    console.error("ERROR 💣", err);

    // 2) Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

const handleDuplicateFieldsDB = (error) => {
  // console.log(error);
  return new AppError(error.errors[0].message, 400);
};
const handleSequelize = (error) => {
  // console.log(error);
  return new AppError(error.errors[0].message, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    // Mark Sequelize Operational Errors
    // duplicate field error
    // if (err.name === "SequelizeUniqueConstraintError")
    //   err = handleDuplicateFieldsDB(err);

    if (err.name.startsWith("Sequelize")) err = handleSequelize(err);
    sendErrorProd(err, res);
  }
};
