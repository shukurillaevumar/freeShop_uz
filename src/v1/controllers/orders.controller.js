const mongoose = require("mongoose");
const handleError = require("../../helpers/error.service");
const ordersModule = require("../module/orders/orders.module");
const ordersService = require("../service/order.service");

const create = async (req, res) => {
  try {
    const { userId, orders, amount, address } = req.body;

    validateCreateInputParams(userId, orders, amount, address);

    const order = await ordersService.create(userId, orders, amount, address);

    return res.json({ data: order });
  } catch (err) {
    return res.json(handleError(err.message, 500, err.name));
  }
};
const update = async (req, res) => {
  try {
    validateUpdateParams(req);
    const { orders } = req.body;
    const result = await ordersService.update(orders);
    if (result.matchedCount === 0) {
      return res.json(handleError("Order is not found", 404, update.name));
    }
    if (result.modifiedCount === 0) {
      return res.json(
        handleError("Order has been already updated", 404, update.name)
      );
    }
    return res.json({ status: "Updated" });
  } catch (err) {
    return res.json(handleError(err.message, 500, err.name));
  }
};
const getById = async (req, res) => {
  const OrderId = req.params.id;
  console.log(req);
  if (!mongoose.isValidObjectId(OrderId)) {
    return res.json(handleError("OrderId is not valid", 500, { OrderId }));
  }
  try {
    const order = await ordersModule.getById(OrderId);
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
      return res.json(handleError("OrderId is not valid", 400, { Orderid }));
    }
    const result = await ordersModule.deleteById(Orderid);

    if (result.modifiedCount === 0) {
      return res.json(handleError("Order is not found", 404, deleteById.name));
    }
    return res.json({
      status: "Deleted",
      Orderid,
    });
  } catch (err) {
    res.json(handleError(err.message, 500, err.name));
  }
};

const validateCreateInputParams = (userId, orders, amount, address) => {
  if (!mongoose.isValidObjectId(userId)) {
    throw new Error("userId is not valid");
  }
  if (!Array.isArray(orders)) {
    throw new Error("orders is not valid");
  }
  if (orders.length === 0) {
    throw new Error("order list is empty");
  }

  if (!amount) {
    throw new Error("amount is not defined");
  }
  if (!address) {
    throw new Error("address is not defined");
  }

  orders.forEach((order) => {
    if (!mongoose.isValidObjectId(order.productId)) {
      throw new Error("orderId is not valid");
    }
    if (order.quantity < 1) {
      throw new Error("Quantity is not valid");
    }
    if (!order.productId || !order.quantity) {
      throw new Error(
        "Each product should include productId and quantity fields"
      );
    }
  });
};
const validateUpdateParams = (req) => {
  const { orders } = req.body;
  if (!mongoose.isValidObjectId(req.params.id)) {
    throw new Error("OrderId is not valid");
  }
  if (!Array.isArray(orders)) {
    throw new Error("Orders is not valid (It should be type of Array)");
  }
  if (orders.length === 0) {
    throw new Error("Orders' field is empty: Add more Orders to update");
  }
  orders.forEach((order) => {
    if (!order.id || (!order.quantity && order.quantity !== 0)) {
      throw new Error("Each order should include id and quantity fields");
    }
    if (!mongoose.isValidObjectId(order.id)) {
      throw new Error("Id is not valid");
    }
    if (order.quantity < 0) {
      throw new Error("Quantity should not be lower than zero");
    }
    if (!product.deleted && product.deleted !== false) {
      throw new Error("deleted field should be defined");
    }
  });
};
module.exports = {
  create,
  update,
  getById,
  deleteById,
};
