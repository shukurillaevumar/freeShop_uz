const mongoose = require("mongoose");
const handleError = require("../../helpers/error.service");
const cartsModule = require("../module/carts/carts.module");
const cartService = require("../service/cart.service");

const create = async (req, res) => {
  try {
    //const userId = req.user.id;
    const { userId, products } = req.body;

    validateCreateInputParams(userId, products);

    const cart = await cartsModule.create(userId, products);

    return res.json({ data: cart });
  } catch (err) {
    return res.json(handleError(err.message, 500, err.name));
  }
};
const update = async (req, res) => {
  try {
    validateUpdateParams(req);
    const { products } = req.body;
    const cart = await cartService.update(products);
    res.json(cart);
  } catch (err) {
    return res.json(handleError(err.message, 500, err.name));
  }
};
const getById = async (req, res) => {
  const CartId = req.params.id;
  if (!mongoose.isValidObjectId(CartId)) {
    return res.json(handleError("CartId is not valid", 500, { CartId }));
  }
  try {
    const cart = await cartsModule.getById(CartId);
    if (!cart) {
      return res.json(handleError("Cart is not found", 404, getById.name));
    }
    return res.json(cart);
  } catch (err) {
    return res.json(handleError(err.message, 500, err.name));
  }
};
const deleteById = async (req, res) => {
  try {
    const cartId = req.params.id;
    if (!mongoose.isValidObjectId(cartId)) {
      return res.json(handleError("CartId is not valid", 400, { cartId }));
    }
    const result = await cartsModule.deleteById(cartId);
    if (result.modifiedCount === 0) {
      return res.json(handleError("Cart is not found", 404, deleteById.name));
    }
    return res.json({
      status: "Deleted",
      cartId,
    });
  } catch (err) {
    res.json(handleError(err.message, 500, err.name));
  }
};

const validateCreateInputParams = (userId, products) => {
  if (!mongoose.isValidObjectId(userId)) {
    throw new Error("userId is not valid");
  }
  if (!Array.isArray(products)) {
    throw new Error("products is not valid");
  }
  if (products.length === 0) {
    throw new Error("product list is empty");
  }
  products.forEach((product) => {
    if (!mongoose.isValidObjectId(product.productId)) {
      throw new Error("productId is not valid");
    }
    if (product.quantity < 1) {
      throw new Error("Quantity is not valid");
    }
    if (!product.productId || !product.quantity) {
      throw new Error(
        "Each product should include productId and quantity fields"
      );
    }
  });
};
const validateUpdateParams = (req) => {
  const { products } = req.body;
  if (!Array.isArray(products)) {
    throw new Error("Products is not valid (It should be type of Array)");
  }

  if (products.length === 0) {
    throw new Error("Products' field is empty: Add more products to update");
  }
  products.forEach((product) => {
    if (!product.id || !product.quantity) {
      throw new Error("Each product should include id and quantity fields");
    }
    if (!mongoose.isValidObjectId(product.id)) {
      throw new Error("Id is not valid");
    }
    if (product.quantity < 0) {
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
