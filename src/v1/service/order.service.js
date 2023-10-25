const ordersModule = require("../module/orders/orders.module");

const update = async (orders) => {
  const result = orders.filter((product) => {
    return product.deleted === false;
  });
  return await ordersModule.update(result);
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
