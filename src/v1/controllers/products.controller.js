const v1ProductService = require("../service/products.service");
const ProductModule = require("../module/products/products.module");

const create = async (req, res) => {
  const data = await validateCreateInput(req, res);
  const product = {
    category: data.category,
    price: data.price,
    name: data.name,
    SKU: data.SKU,
    title: data.title,
    desc: data.desc,
    manifacturer_id: data.manifacturer_id,
  };

  const token = await v1ProductService.create(product);
  return res.status(201).send({ status: "OK", authToken: token });
};

const validateCreateInput = async (req, res) => {
  const resultData = {};
  const { category, price, name, SKU, title, desc, manifacturer_id } = req.body;

  //Check category
  if (!category) {
    throw new Error("Category is not found");
  }
  resultData.category = category;
  //Check price
  if (!price) {
    throw new Error("Price is not found");
  }
  resultData.price = price;
  //Check name
  if (!name) {
    throw new Error("Name is not found");
  }
  const product = await ProductModule.findOne({ name: name });

  if (!product) {
    throw new Error("Product has been already created");
  }
  resultData.name = name;
  //Check SKU
  if (!SKU) {
    throw new Error("SKU is not found");
  }
  resultData.SKU = SKU;
  //Check title
  if (!title) {
    throw new Error("Title is not found");
  }
  resultData.title = title;
  //Check description
  if (!desc) {
    throw new Error("Description is not found");
  }
  resultData.desc = desc;
  //Check manifacturer_id
  if (!manifacturer_id) {
    throw new Error("Manifacturer_id is not found");
  }
  resultData.manifacturer_id = manifacturer_id;

  return resultData;
};

module.exports = {
  create,
};
