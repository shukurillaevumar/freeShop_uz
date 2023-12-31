const cartModel = require("../../database/models/cart.schema");
const create = async (userId, products) => {
  return await cartModel.create({
    user_id: userId,
    products,
    createdAt: Date.now(),
  });
};
const update = async (cartId, updateProducts) => {
  const CartDoc = await cartModel.updateOne(
    { _id: cartId, status: "CREATED" },
    {
      products: updateProducts,
    },
    { new: true }
  );
  return CartDoc;
};
const getById = async (cart_id) => {
  const CartDoc = await cartModel.findOne({ _id: cart_id, status: "CREATED" });
  return CartDoc;
};
const deleteById = async (cart_id) => {
  const CartDoc = await cartModel.updateOne(
    { _id: cart_id, status: "CREATED" },
    {
      status: "DELETED",
    },
    { new: true }
  );
  return CartDoc;
};

module.exports = {
  create,
  update,
  getById,
  deleteById,
};
