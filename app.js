const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// import routers
const answerRouter = require("./routes/answerRoute");
const articleRouter = require("./routes/articleRoute");
const propertyRouter = require("./routes/propertyRoute");
const questionRouter = require("./routes/questionRoute");
const userRouter = require("./routes/userRoute");

// middleware
app.use(express.json());
app.use(cookieParser());
// store requested time on req
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// mount routers
app.use("/api/v1/users", userRouter);
app.use("/api/v1/answers", answerRouter);
app.use("/api/v1/articles", articleRouter);
app.use("/api/v1/properties", propertyRouter);
app.use("/api/v1/questions", questionRouter);

// catch all undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// middleware - Global Error Handler
app.use(globalErrorHandler);

module.exports = app;
