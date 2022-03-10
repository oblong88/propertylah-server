const Question = require("../models/questionModel");
const CustomAPIQuery = require("../utils/customAPIQuery");

exports.createQuestion = async (data) => {
    const newQuestion = await Question.create(data);
    if (!newQuestion) throw new Error("Error creating new question")
    return newQuestion;
}

exports.getQuestion = async (id) => {
  const foundQuestion = await Question.findByPk(id);
  if (!foundQuestion) throw new Error("User not found");
  return foundQuestion;
};

exports.getAllQuestions = async (queryObj) => {
   // object to hold the list of options for the final query
  let queryOptions = {};

  const customAPIQuery = new CustomAPIQuery(queryObj, queryOptions)
    .filter()
    .sort()
    .limitFields()
    .paginate()
  

  const allQuestion = await Question.findAll(customAPIQuery.queryOptions)
  return allQuestion;
};

exports.updateQuestion = async (id, data) => {
  const updatedQuestion = await Question.update(data, {
    where: { id },
  });
};

exports.deleteQuestion = async (id) => {
  const result = await Question.destroy({
    where: { id },
  });
  if (!result) throw new Error(`No question with id ${id} found`);
};