const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const v1OrdersController = require("../controllers/orders.controller");

router.use(bodyParser.json());

router.post("/", (req, res) => v1OrdersController.create(req, res));
router.get("/:id", (req, res) => v1OrdersController.getById(req, res));
router.put("/:id", (req, res) => v1OrdersController.update(req, res));
router.delete("/:id", (req, res) => v1OrdersController.deleteById(req, res));

module.exports = router;
