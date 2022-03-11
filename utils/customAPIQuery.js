const { Op, where } = require("sequelize");
const AppError = require("./appError");

class CustomAPIQuery {
  constructor(queryObj, queryOptions) {
    this.queryObj = queryObj;
    this.queryOptions = queryOptions;
  }

  filter() {
    // define fields to be excluded - db should not have these fields!
    const excludedFields = ["page", "sort", "limit", "fields"];

    // queryFilter - shallow copy of query object
    const queryFilter = { ...this.queryObj };

    // remove non-filter field types
    excludedFields.forEach((el) => delete queryFilter[el]);

    this.queryOptions.where = {};

    for (const [field, whereObj] of Object.entries(queryFilter)) {
      const operator = Object.keys(whereObj)[0];
      const compareVal = Object.values(whereObj)[0];

      // check if operator is valid
      if (!Object.prototype.hasOwnProperty.call(Op, operator)) {
        throw new AppError(`Invalid filter operator (${operator})`, 400);
      }

      // update query options
      this.queryOptions.where[field] = {
        [Op[operator]]: compareVal,
      };
    }
    return this;
  }

  sort() {
    if (this.queryObj.sort) {
      this.queryOptions.order = [];
      const sortBy = this.queryObj.sort.split(",");
      sortBy.forEach((field) => {
        // make it into arr with asc/dsc
        let orderType = "ASC";
        if (field.startsWith("-")) {
          orderType = "DESC";
          field = field.slice(1, field.length);
        }

        const arr = [field, orderType];
        this.queryOptions.order.push(arr);
      });
    }
    return this;
  }

  limitFields() {
    if (this.queryObj.fields)
      this.queryOptions.attributes = this.queryObj.fields
        .split(",")
        .filter((el) => el !== "password");
    // do not allow user to select password field

    return this;
  }

  paginate() {
    if (this.queryObj.page || this.queryObj.limit) {
      // default page 1 and 100 results
      const page = +this.queryObj.page || 1;
      const limit = +this.queryObj.limit || 100;
      const skip = (page - 1) * limit;
      this.queryOptions.offset = skip;
      this.queryOptions.limit = limit;
    }
    return this;
  }
}

module.exports = CustomAPIQuery;
