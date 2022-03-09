const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("./db");
const Question = require("./questionModel");

class Answer extends Model {}

Answer.init(
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
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
      email: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
      },
      answer: {
         type: DataTypes.STRING,
         allowNull: false,
         field: "answer",
      },
      category: {
         type: DataTypes.STRING,
         allowNull: false,
         field: "category",
      },
      createdAt: {
         type: DataTypes.DATE,
         // defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
         field: "created_at",
      },
      updatedAt: {
         type: DataTypes.DATE,
         // defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
         field: "updated_at",
      },
   },
   {
      sequelize,
      modelName: "Answers",
      tableName: "answers",
   }
);

// Create associations
Answer.belongsTo(
   Question, {
      foreignKey: "questionId"
   }
);


// const Answer = sequelize.define(
//    "Answer", {
//       id: {
//          type: DataTypes.INTEGER,
//          primaryKey: true,
//          autoIncrement: true,
//       },
//       firstName: {
//          type: DataTypes.STRING,
//          allowNull: false,
//          field: "first_name",
//       },
//       lastName: {
//          type: DataTypes.STRING,
//          allowNull: false,
//          field: "last_name",
//       },
//       email: {
//          type: DataTypes.STRING,
//          allowNull: false,
//          unique: true,
//       },
//       answer: {
//          type: DataTypes.STRING,
//          allowNull: false,
//          field: "answer",
//       },
//       category: {
//          type: DataTypes.STRING,
//          allowNull: false,
//          field: "category",
//       },
//       createdAt: {
//          type: DataTypes.DATE,
//          // defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
//          field: "created_at",
//       },
//       updatedAt: {
//          type: DataTypes.DATE,
//          // defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
//          field: "updated_at",
//       },
//    },
//    {
//       sequelize,
//       modelName: "Answers",
//       tableName: "answers",
//    }
// );

module.exports = Answer;
