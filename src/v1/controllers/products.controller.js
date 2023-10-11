const mongoose = require("mongoose");
const { getObjectWith3Lang } = require("../../helpers/validator");
const productService = require("../service/products.service");

const create = async (req, res) => {
  const product = await validateCreateInput(req, res);
  const newProduct = await productService.create(product);
  return res.json(newProduct);
};

const getById = async (req, res) => {
  const productId = req.params.id;
  if (!mongoose.isValidObjectId(productId)) {
    throw new Error("ProductId is not valid");
  }
  const product = await productService.getById(productId);
  if (!product) {
    throw new Error("Product is not found");
  }
  return res.json(product);
};

const getByPagination = async (req, res) => {
  const { page, size } = req.query;
  const products = await productService.getByPagination(page, size);
  return res.json(products);
};

const deleteById = async () => {
  const productId = req.params.id;
  if (!mongoose.isValidObjectId(productId)) {
    throw new Error("ProductId is not valid");
  }
  const product = await productService.deleteById(productId);
  if (!product) {
    throw new Error("Product is not found");
  }
  return res.json(product);
};

const validateCreateInput = async (req, res) => {
  const resultData = {};
  const {
    category,
    price,
    name,
    SKU,
    title,
    desc,
    manifacturer_id,
    discount_id,
  } = req.body;

  //Check category
  if (!category) {
    throw new Error("Category is not found");
  }
  if (!mongoose.isValidObjectId(category))
    throw new Error("Category is not valid");
  resultData.category = category;
  //Check price
  if (!price) {
    throw new Error("Price is not found");
  }
  resultData.price = price;
  //Check name with regex
  if (!name) {
    throw new Error("Name is not found");
  }
  resultData.name = name;
  // const product = await ProductModule.findOne({ name: name });

  // if (product) {
  //   throw new Error("Product has been already created");
  // }
  //Check SKU
  if (!SKU) {
    throw new Error("SKU is not found");
  }
  resultData.SKU = SKU;
  //Check title
  if (!title) {
    throw new Error("Title is not found");
  }
  if (!getObjectWith3Lang(title)) {
    throw new Error("Title is not valid");
  }
  resultData.title = title;
  //Check description with regex
  if (!desc) {
    throw new Error("Description is not found");
  }
  resultData.desc = desc;
  //Check manifacturer_id
  if (manifacturer_id) {
    if (!mongoose.isValidObjectId(manifacturer_id)) {
      throw new Error("Manifacturer_id is not valid");
    }
    resultData.manifacturer_id = manifacturer_id;
  }
  //Check discount_id
  if (discount_id) {
    if (!mongoose.isValidObjectId(discount_id)) {
      throw new Error("Discount_id is not valid");
    }
    resultData.discount_id = discount_id;
  }

  return resultData;
};

module.exports = {
  create,
  getById,
  getByPagination,
  deleteById,
};
