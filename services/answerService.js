// import your model here
const Answer = require("../models/answerModel");

exports.createAnswer = async (data) => {
  const newAnswer = await Answer.create(data);
  if (!newAnswer) throw new Error("Error creating answer");
  return newAnswer;
};

exports.getAnswer = async (id) => {
  const foundAnswer = await Answer.findByPk(id);
  if (!foundAnswer) throw new Error(`Answer ID #${id} not found`);
  return foundAnswer;
};

exports.getAllAnswers = async () => {
  const allAnswers = await Answer.findAll();
  return allAnswers;
};

exports.updateAnswer = async (id, data) => {
  const updateAnswer = await Answer.update(data, {
    where: { id },
  });

  if(!updateAnswer) throw new Error(`Answer ID #${id} not found, therefore can't be updated!`);
};

exports.deleteAnswer = async (id) => {
  const answer = await Answer.destroy({
    where: { id },
  });

  if (!answer) throw new Error(`Answer ID ${id} not found`);
};
