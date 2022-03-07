const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../models/db");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
      validate: {
        customValidator: (value) => {
          const enums = ["user", "agent", "admin"];
          if (!enums.includes(value)) {
            throw new Error("not a valid role");
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "last_name",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "updated_at",
    },
  },
  {
    sequelize,
    modelName: "Users",
    tableName: "user",
    defaultScope: {
      attributes: {
        exclude: ["password"],
      },
    },
    scopes: {
      withPassword: {
        attributes: {},
      },
    },
  }
);

// TODO: create associations

module.exports = User;
