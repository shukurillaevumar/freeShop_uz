const mongoose = require("mongoose");
const { getObjectWith3Lang } = require("../../helpers/validator");
const categoryService = require("../service/category.service");

const create = async (req, res) => {
  const category = await validateCreateInput(req, res);
  const newProduct = await categoryService.create(category);
  return res.json(newProduct);
};

const getById = async (req, res) => {
  const categoryId = req.params.id;
  if (!mongoose.isValidObjectId(categoryId)) {
    throw new Error("CategoryId is not valid");
  }
  const category = await categoryService.getById(categoryId);
  if (!category) {
    throw new Error("Category is not found");
  }
  return res.json(category);
};

const deleteById = async (req, res) => {
  const categoryId = req.params.id;
  if (!mongoose.isValidObjectId(categoryId)) {
    throw new Error("CategoryId is not valid");
  }
  const category = await categoryService.deleteById(categoryId);
  if (!category) {
    throw new Error("Category is not found");
  }
  return res.json({ categoryId: categoryId, status: "Deleted" });
};

const validateCreateInput = async (req, res) => {
  const resultData = {};
  const { name, title, desc, isActive } = req.body;

  //Check name with regex
  if (!name) {
    throw new Error("Name is not found");
  }
  resultData.name = name;
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
  //Check isActive
  if (!isActive) {
    throw new Error("isActive is false");
  }
  resultData.isActive = isActive;

  return resultData;
};

module.exports = {
  create,
  getById,
  deleteById,
};
