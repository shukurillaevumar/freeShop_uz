const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const v1CartsController = require("../controllers/cart.controller");
const { authorize } = require("../middleware/auth.middleware");

router.use(bodyParser.json());

router.post("/", authorize, (req, res) => v1CartsController.create(req, res));
router.get("/:id", (req, res) => v1CartsController.getById(req, res));
router.put("/:id", (req, res) => v1CartsController.update(req, res));
router.delete("/:id", (req, res) => v1CartsController.deleteById(req, res));

module.exports = router;
