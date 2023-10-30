const orderModel = require("../../database/models/order.schema");
const create = async (order) => {
  const orderDoc = await orderModel.create(order);
  return orderDoc;
};

const update = async (order_id, status) => {
  const orderDoc = await orderModel.updateOne({ _id: order_id }, { status });
  return orderDoc;
};

const getById = async (order_id) => {
  const orderDoc = await orderModel.findById(order_id);
  return orderDoc;
};

const deleteById = async (order_id) => {
  const orderDoc = await orderModel.updateOne(
    { _id: order_id },
    {
      status: "DELETED",
    }
  );
  return orderDoc;
};

module.exports = {
  create,
  update,
  getById,
  deleteById,
};
