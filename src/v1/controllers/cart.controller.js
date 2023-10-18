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
  const cartId = req.params.id;
  if (!mongoose.isValidObjectId(cartId)) {
    return res.json(handleError("ProductId is not valid", 500, { cartId }));
  }
  try {
    const cart = await cartService.getById(cartId);
    if (!cart) {
      return res.json(handleError("Product is not found", 500, {}));
    }
    const data = validateUpdateParams(req);
    const updatedCart = await cartService.update(cartId, data);
    return res.json(updatedCart);
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
    const cart = await cartService.getById(CartId);
    if (!cart) {
      return res.json(handleError("Cart is not found", 500, {}));
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
      throw new Error("CartId is not valid");
    }
    const cart = await cartService.deleteById(cartId);
    if (!cart) {
      throw new Error("Cart is not found");
    }
    return res.json({
      cartId: cartId,
      status: "Cart successfully deleted",
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
    if (product.quantity.length >= 1) {
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
  const { productId, quantity } = req.body;

  const updateData = {};
  if (!mongoose.isValidObjectId(productId)) {
    throw new Error("CartId is not valid");
  }
  updateData.productId = productId;

  if (quantity <= 0) {
    throw new Error("quantity is not valid");
  }
  updateData.quantity = quantity;
  return updateData;
};
module.exports = {
  create,
  update,
  getById,
  deleteById,
};
