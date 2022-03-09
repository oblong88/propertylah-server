// import your model here
const Answer = require("../models/answerModel");
const CustomAPIQuery = require("../utils/customAPIQuery");

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

exports.getAllAnswers = async (queryObj) => {
  // Object to hold list of options for query
  let queryOptions = {};
  console.log(queryObj);
  const customAPIQuery = new CustomAPIQuery(queryObj, queryOptions)
    .filter()
    .limitFields()
    .sort()
    .paginate();

  // Execute query
  const allAnswers = await Answer.findAll(customAPIQuery.queryOptions);
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
