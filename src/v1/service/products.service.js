const ProductModule = require("../module/products/products.module");

const create = async (product) => {
  // Prepare data for DB
  const productForDb = {
    ...product,
    status: "PENDING",
    discount_id: null,
    created_at: Date.now(),
  };
  // Send ready data to the productModule to create it in DB
  const productDoc = await ProductModule.create(productForDb);
  return productDoc;
};

const getById = async (product_id) => {
  return await ProductModule.getById(product_id);
};

const getByPagination = async (page, size) => {
  return await ProductModule.getByPagination(page, size);
};

const deleteById = async (product_id) => {
  return await ProductModule.deleteById(product_id);
};

const update = async (product_id, updateData) => {
  return await ProductModule.update(product_id, updateData);
};

module.exports = {
  create,
  getById,
  getByPagination,
  deleteById,
  update,
};
