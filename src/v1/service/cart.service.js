const CartModule = require("../module/carts/carts.module");

const update = async (cart_id, updateData) => {
  return await CartModule.update(cart_id, updateData);
};
const getById = async (cart_id) => {
  return await CartModule.getById(cart_id);
};
const deleteById = async (cartId) => {
  return await CartModule.deleteById(cartId);
};

module.exports = {
  update,
  getById,
  deleteById,
};
