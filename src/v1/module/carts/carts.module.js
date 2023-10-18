const cartModel = require("../../database/models/cart.schema");
const create = async (userId, products) => {
  return await cartModel.create({
    user_id: userId,
    products,
    createdAt: Date.now(),
  });
};
const update = async (id, data) => {
  const cartDoc = await cartModel.findByIdAndUpdate(id, data, { new: true });
  return cartDoc;
};
const getById = async (cart_id) => {
  const CartDoc = await cartModel.findById(cart_id);
  return CartDoc;
};
const deleteById = async (cart_id) => {
  const CartDoc = await cartModel.findByIdAndDelete(cart_id);
  return CartDoc;
};

module.exports = {
  create,
  update,
  getById,
  deleteById,
};
