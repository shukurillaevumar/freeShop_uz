const ProductModel = require("../../database/models/product.schema");
// Create product in DB
const create = async (product) => {
  const productDoc = await ProductModel.create(product);
  return productDoc;
};
// Create product from DB
const findOne = async (query) => {
  return await ProductModel.findOne(query);
};

const getById = async (product_id) => {
  const productDoc = await ProductModel.findById(product_id);
  return productDoc;
};

const getByPagination = async (page, size) => {
  const products = await ProductModel.find()
    .limit(size)
    .skip(page - 1);
  return products;
};

const deleteById = async (product_id) => {
  const productDoc = await ProductModel.findByIdAndDelete(product_id);
  return productDoc;
};

module.exports = {
  create,
  findOne,
  getById,
  getByPagination,
  deleteById,
};
