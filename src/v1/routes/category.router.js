const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const v1CategoryController = require("../controllers/category.controller");

router.use(bodyParser.json());

router.post("/", (req, res) => v1CategoryController.create(req, res));
router.get("/:id", (req, res) => v1CategoryController.getById(req, res));
router.delete("/:id", (req, res) => v1CategoryController.deleteById(req, res));

module.exports = router;
