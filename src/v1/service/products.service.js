const { generateToken } = require("../middleware/auth.middleware");
const ProductModule = require("../module/products/products.module");

const create = async (product) => {
  // Prepare data for DB
  const productForDb = {
    ...product,
    active: true,
    created_at: Date.now(),
    updated_at: Date.now(),
  };
  // Send ready data to the productModule to create it in DB
  const productDoc = await ProductModule.create(productForDb);
  //Create token from _id of productDoc above
  const token = generateToken(productDoc._id);
  return token;
};

module.exports = {
  create,
};
