const ProductModule = require("../module/products/products.module");

const create = async (product) => {
  // Prepare data for DB
  const productForDb = {
    ...product,
    status: "active",
    discount_id: null,
    created_at: Date.now(),
  };
  // Send ready data to the productModule to create it in DB
  const productDoc = await ProductModule.create(productForDb);
  console.log(productDoc);
  return productDoc;
};

module.exports = {
  create,
};
