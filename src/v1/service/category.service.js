const CategoryModule = require("../module/categories/categories.module");

const create = async (category) => {
  // Prepare data for DB
  const categoryForDb = {
    ...category,
    discount_id: null,
    created_at: Date.now(),
  };
  // Send ready data to the categoryModule to create it in DB
  const categoryDoc = await CategoryModule.create(categoryForDb);
  return categoryDoc;
};

const getById = async (category_id) => {
  return await CategoryModule.getById(category_id);
};

const deleteById = async (category_id) => {
  return await CategoryModule.deleteById(category_id);
};

module.exports = {
  create,
  getById,
  deleteById,
};
