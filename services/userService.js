const { Op, where } = require("sequelize");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

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
  if (!newUser) throw new Error("Error creating new user");

  return newUser;
};

exports.getUser = async (id) => {
  const foundUser = await User.findByPk(id);
  if (!foundUser) throw new Error("User not found");
  return foundUser;
};

exports.getAllUsers = async (queryObj) => {
  console.log("queryObj", queryObj);

  let queryOptions = {};
  queryOptions.where = {};

  // 1) FILTERING (gt, lt, etc) [ DONE ]
  // example:
  // Post.findAll({
  //   where: {
  //     authorId: {
  //       [Op.eq]: 2
  //     }
  //   }
  // });

  // define fields to be excluded - db should not have these fields!
  const excludedFields = ["page", "sort", "limit", "fields"];

  // queryFilter - shallow copy of query object
  const queryFilter = { ...queryObj };

  // remove non-filter field types
  excludedFields.forEach((el) => delete queryFilter[el]);
  console.log("queryFilter", queryFilter);

  for (const [field, whereObj] of Object.entries(queryFilter)) {
    const operator = Object.keys(whereObj)[0];
    const compareVal = Object.values(whereObj)[0];

    // check if operator is valid
    if (!Object.prototype.hasOwnProperty.call(Op, operator)) {
      throw new Error(`Invalid filter operator (${operator})`);
    }

    // update query options
    queryOptions.where[field] = {
      [Op[operator]]: compareVal,
    };
  }

  // 2) LIMIT FIELDS (attributes) [ DONE ]
  // example:
  // Model.findAll({
  //   attributes: ['foo', 'bar']
  // });

  if (queryObj.fields)
    queryOptions.attributes = queryObj.fields
      .split(",")
      .filter((el) => el !== "password");

  // 3) PAGINATION

  // 4) SORT

  if (queryObj.sort) {
    queryOptions.sort = {};
    const sortBy = queryObj.sort.split(",").join(" ");
    console.log("sort", [queryObj.sort]);
    console.log("sortBy", sortBy);
  }
  // EXECUTE QUERY
  console.log("queryOptions", queryOptions);
  const allUsers = await User.findAll(queryOptions);
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
