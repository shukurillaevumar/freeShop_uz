const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const v1ProductController = require("../controllers/products.controller");

router.use(bodyParser.json());

router.post("/create", (req, res) => v1ProductController.create(req, res));

module.exports = router;
