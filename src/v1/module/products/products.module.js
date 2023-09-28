const ProductModule = require("../../database/models/product.schema");
// Create product in DB
const create = async (product) => {
  const productDoc = await ProductModule.create(product);
  return productDoc;
};
// Create product from DB
const findOne = async (query) => {
  return await ProductModule.findOne(query);
};

module.exports = {
  create,
  findOne,
};
