const User = require("../models/userModel");

exports.createUser = async (data) => {
  // TODO: validation on data, throw error
  const newUser = await User.create(data);
  if (!newUser) throw new Error("Error creating new user");
  return newUser;
};

exports.getUser = async (id) => {
  const foundUser = await User.findByPk(id);
  if (!foundUser) throw new Error("User not found");
  return foundUser;
};

exports.getAllUsers = async () => {
  // TODO: add filtering features
  const allUsers = await User.findAll();
  return allUsers;
};

exports.updateUser = async (id, data) => {
  // TODO: validation - remove role
  const updatedUser = await User.update(data, {
    where: { id },
  });
};

exports.deleteUser = async (id) => {
  const result = await User.destroy({
    where: { id },
  });
  if (!result) throw new Error(`No user with id ${id} found`);
};
