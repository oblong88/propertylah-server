const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { testConnection, sequelize } = require("./models/db");

const app = require("./app");

const port = process.env.PORT || 3000;

// uncomment next line to test if db connects
testConnection();

const startServer = () => {
  const server = app.listen(port, () => {
    console.log("[server.js] Current env:", app.get("env"));
    console.log(`[server.js] ✅ App running on port ${port}...`);
  });

  process.on("unhandledRejection", (err) => {
    console.log("[server.js] ❌ Unhandled Rejection! Shutting down...");
    console.log(`[server.js ] ${err.name}`, err.message);

    server.close(() => {
      process.exit(1);
    });
  });
};

// process.env.NODE_ENV === "development" &&
//   sequelize
//     .sync({ alter: true })
//     .then(startServer)
//     .catch((err) =>
//       console.error("[server.js] ❌ Database error: ", err.message)
//     );

// process.env.NODE_ENV === "production" && startServer();

// sync db regardless of env
sequelize
  .sync()
  .then(startServer)
  .catch((err) =>
    console.error("[server.js] ❌ Database error: ", err.message)
  );
