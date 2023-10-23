const ordersModule = require("../module/orders/orders.module");

const update = async (orders) => {
  return await orders;
};

const create = async (order) => {
  const orderForDb = {
    ...order,
    status: "PENDING",
    created_at: Date.now(),
  };

  const orderDoc = await ordersModule.create(orderForDb);
  return orderDoc;
};

module.exports = {
  update,
  create,
};
