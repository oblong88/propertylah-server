const { Sequelize } = require("sequelize");

// DB connection
const sequelize = new Sequelize(
  process.env.NODE_ENV === "development"
    ? process.env.DEV_DB_NAME
    : process.env.PROD_DB_NAME,
  process.env.NODE_ENV === "development"
    ? process.env.DEV_DB_USERNAME
    : process.env.PROD_DB_USERNAME,
  "",
  {
    host: "localhost",
    dialect: "postgres",
    logging: false,
  }
);

// test connection function
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection success!");
  } catch (error) {
    console.log("Connection failed", error);
  }
};

// exports - export the connection, test fn
module.exports = {
  sequelize,
  testConnection,
  Question
};
