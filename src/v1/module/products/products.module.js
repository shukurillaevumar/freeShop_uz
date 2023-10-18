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

const update = async (id, data) => {
  const productDoc = await ProductModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return productDoc;
};

const search = async (searchText) => {
  const result = await ProductModel.find({
    name: new RegExp(searchText, "i"),
  });
  return result;
};

module.exports = {
  create,
  findOne,
  getById,
  getByPagination,
  deleteById,
  update,
  search,
};
