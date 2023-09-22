const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const v1UserController = require("../controllers/user.controller");
const { authentificate } = require("../middleware/auth.middleware");

router.use(bodyParser.json());

//Login user
router.post("/login", (req, res) => res.json({ token: req.token }));

//Register user
router.post("/register", authentificate, (req, res) => {
  return v1UserController.register(req, res);
});

//Logout user
router.post("/logout", (req, res) => {
  res.send("Logout recieved");
});

module.exports = router;
