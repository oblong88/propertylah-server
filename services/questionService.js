const Question = require("../models/questionModel");

exports.createQuestion = async (data) => {
    const newQuestion = await Question.create(data);
    if (!newQuestion) throw new Error("Error creating new question")
    return newQuestion;
}

exports.getQuestion = async (id) => {
  const foundQuestion = await User.findByPk(id);
  if (!foundQuestion) throw new Error("User not found");
  return foundQuestion;
};

exports.getAllQuestion = async () => {
  const allQuestion = await User.findAll();
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