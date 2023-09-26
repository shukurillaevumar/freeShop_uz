const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const v1UserController = require("../controllers/user.controller");
const { authentificate } = require("../controllers/user.controller");

router.use(bodyParser.json());

//Login user
router.post("/login", authentificate, (req, res) => {
  return v1UserController.login(req, res);
});

//Register user
router.post("/register", (req, res) => {
  return v1UserController.register(req, res);
});

//Logout user
router.post("/logout", (req, res) => {
  res.send("Logout recieved");
});

module.exports = router;
