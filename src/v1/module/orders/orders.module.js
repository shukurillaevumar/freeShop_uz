const orderModel = require("../../database/models/order.schema");
const create = async (order) => {
  const orderDoc = await orderModel.create(order);
  return orderDoc;
};

const update = async (updateOrders) => {
  const orderDoc = await orderModel.updateOne(
    { status: "CREATED" },
    { orders: updateOrders },
    { new: true }
  );
  return orderDoc;
};

const getById = async (order_id) => {
  const orderDoc = await orderModel.findOne({
    _id: order_id,
  });
  return orderDoc;
};

const deleteById = async (order_id) => {
  const orderDoc = await orderModel.updateOne(
    { _id: order_id },
    {
      status: "DELETED",
    },
    { new: true }
  );
  return orderDoc;
};

module.exports = {
  create,
  update,
  getById,
  deleteById,
};
