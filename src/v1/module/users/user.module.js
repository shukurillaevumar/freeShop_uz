const UserModel = require("../../database/models/user.schema");

const create = async (user) => {
  return await UserModel.create(user);
};

const findOne = async (query) => {
  return await UserModel.findOne(query);
};

module.exports = {
  create,
  findOne,
};
