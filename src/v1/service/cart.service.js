const cartsModule = require("../module/carts/carts.module");

const update = async (products, cartId) => {
  const result = products.filter((product) => {
    return product.deleted === false;
  });
  return await cartsModule.update(cartId, result);
};

module.exports = {
  update,
};
