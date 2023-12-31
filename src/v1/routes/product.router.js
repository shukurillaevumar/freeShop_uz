const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const v1ProductController = require("../controllers/products.controller");

router.use(bodyParser.json());

router.post("/", (req, res) => v1ProductController.create(req, res));
router.get("/", (req, res) => v1ProductController.getByPagination(req, res));
router.get("/:id", (req, res) => v1ProductController.getById(req, res));
router.delete("/:id", (req, res) => v1ProductController.deleteById(req, res));
router.put("/:id", (req, res) => v1ProductController.update(req, res));
router.get("/search/all", (req, res) => v1ProductController.search(req, res));

module.exports = router;
