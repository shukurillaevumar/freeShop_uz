const CategoryModel = require("../../database/models/category.schema");
// Create category in DB
const create = async (category) => {
  const categoryDoc = await CategoryModel.create(category);
  return categoryDoc;
};
// Create category from DB
const findOne = async (query) => {
  return await CategoryModel.findOne(query);
};

const getById = async (category_id) => {
  const categoryDoc = await CategoryModel.findById(category_id);
  return categoryDoc;
};

const deleteById = async (category_id) => {
  const categoryDoc = await CategoryModel.findByIdAndDelete(category_id);
  return categoryDoc;
};

module.exports = {
  create,
  findOne,
  getById,
  deleteById,
};
