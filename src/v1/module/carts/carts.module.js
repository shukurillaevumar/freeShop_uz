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
