const mongoose = require("mongoose");
const handleError = require("../../helpers/error.service");
const ordersModule = require("../module/orders/orders.module");
const ordersService = require("../service/order.service");

const create = async (req, res) => {
  try {
    const { userId, orders } = req.body;

    validateCreateInputParams(userId, orders);

    const order = await ordersModule.order(userId, orders);

    return res.json({ data: order });
  } catch (err) {
    return res.json(handleError(err.message, 500, err.name));
  }
};
const update = async (req, res) => {
  try {
    validateUpdateParams(req);
    const { orders } = req.body;
    const order = await ordersService.update(orders);
    res.json(order);
  } catch (err) {
    return res.json(handleError(err.message, 500, err.name));
  }
};
const getById = async (req, res) => {
  const OrderId = req.params.id;
  if (!mongoose.isValidObjectId(OrderId)) {
    return res.json(handleError("OrderId is not valid", 500, { OrderId }));
  }
  try {
    const order = await cartsModule.getById(OrderId);
    if (!order) {
      return res.json(handleError("order is not found", 404, getById.name));
    }
    return res.json(order);
  } catch (err) {
    return res.json(handleError(err.message, 500, err.name));
  }
};
const deleteById = async (req, res) => {
  try {
    const Orderid = req.params.id;
    if (!mongoose.isValidObjectId(Orderid)) {
      return res.json(handleError("Orderid is not valid", 400, { Orderid }));
    }
    const result = await ordersModule.deleteById(Orderid);
    if (result.modifiedCount === 0) {
      return res.json(
        handleError("Orderid is not found", 404, deleteById.name)
      );
    }
    return res.json({
      status: "Deleted",
      Orderid,
    });
  } catch (err) {
    res.json(handleError(err.message, 500, err.name));
  }
};

const validateCreateInputParams = (userId, orders) => {
  if (!mongoose.isValidObjectId(userId)) {
    throw new Error("userId is not valid");
  }
  if (!Array.isArray(orders)) {
    throw new Error("orders is not valid");
  }
  if (orders.length === 0) {
    throw new Error("order list is empty");
  }
  orders.forEach((orders) => {
    if (!mongoose.isValidObjectId(orders.orderId)) {
      throw new Error("orderId is not valid");
    }
    if (orders.quantity < 1) {
      throw new Error("Quantity is not valid");
    }
    if (!orders.orderId || !orders.quantity) {
      throw new Error(
        "Each product should include orderId and quantity fields"
      );
    }
  });
};
const validateUpdateParams = (req) => {
  const { orders } = req.body;
  if (!Array.isArray(orders)) {
    throw new Error("Orders is not valid (It should be type of Array)");
  }

  if (orders.length === 0) {
    throw new Error("Orders' field is empty: Add more Orders to update");
  }
  orders.forEach((orders) => {
    if (!orders.id || !orders.quantity) {
      throw new Error("Each order should include id and quantity fields");
    }
    if (!mongoose.isValidObjectId(orders.id)) {
      throw new Error("Id is not valid");
    }
    if (orders.quantity < 0) {
      throw new Error("Quantity should not be lower than zero");
    }
  });
};
module.exports = {
  create,
  update,
  getById,
  deleteById,
};
