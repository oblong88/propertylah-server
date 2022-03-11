const { Op, where } = require("sequelize");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const CustomAPIQuery = require("../utils/customAPIQuery");
const AppError = require("../utils/appError");

exports.createUser = async (data) => {
  // TODO: validation on data, throw error
  const hashedPwd = await bcrypt.hash(data.password, 10);
  const newUser = await User.create({
    email: data.email,
    password: hashedPwd,
    firstName: data.firstName,
    lastName: data.lastName,
    role: data.role,
  });
  if (!newUser) throw new AppError("Error creating new user");

  return newUser;
};

exports.getUser = async (id) => {
  const foundUser = await User.findByPk(id);
  if (!foundUser) throw new AppError("No user found", 404);
  return foundUser;
};

exports.getAllUsers = async (queryObj) => {
  // object to hold the list of options for the final query
  let queryOptions = {};

  const customAPIQuery = new CustomAPIQuery(queryObj, queryOptions)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  // Execute Query
  const allUsers = await User.findAll(customAPIQuery.queryOptions);
  return allUsers;
};

exports.updateUser = async (id, data) => {
  // TODO: validation - remove role
  const updatedUser = await User.update(data, {
    where: { id },
    returning: true,
  });

  if (!updatedUser[0]) throw new AppError("User not found", 404);

  return updatedUser[1];
};

exports.deleteUser = async (id) => {
  const result = await User.destroy({
    where: { id },
  });
  if (!result) throw new AppError(`No user with id ${id} found`, 404);
};
