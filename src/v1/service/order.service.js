const ordersModule = require("../module/orders/orders.module");

const update = async (orders) => {
  return await orders;
};

const create = async (userId, orders, amount, address) => {
  const orderForDb = {
    userId,
    orders,
    amount,
    address,
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
