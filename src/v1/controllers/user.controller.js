const bcrypt = require("bcrypt");
const v1UserService = require("../service/user.service");
const userValidationRegex = require("../../helpers/validationRegex");
const userModule = require("../module/users/user.module");
const jwt = require("jsonwebtoken");
const { findOne } = require("../module/users/user.module");

const register = async (req, res) => {
  //Validate input params
  const data = await validateRegisterInput(req, res);
  // If vaildation is OK, create user below
  const newUser = {
    email: data.email,
    user_name: data.userName,
    password: await bcrypt.hash(data.password, 10),
  };

  const token = await v1UserService.register(newUser);
  return res.status(201).send({ status: "OK", authToken: token });
};

const login = async (req, res) => {};

const validateRegisterInput = async (req, res) => {
  const resultData = {};
  const { name, email, userName, password } = req.body;
  // Check name
  if (name) {
    resultData.name = name;
  }
  // Check email
  if (email) {
    resultData.email = email;
  }
  // Check userName
  if (!userName) {
    throw new Error("Username is not found");
  }
  if (typeof userName !== "string") {
    throw new Error("Username is not valid");
  }

  if (!userValidationRegex.isEmail.test(userName)) {
    if (!userValidationRegex.isPhoneNumber.test(userName)) {
      throw new Error("userName is not valid");
    }
  }

  const user = await findOne({ user_name: userName });

  if (!user) {
    throw new Error("User has been already registered");
  }
  resultData.userName = userName;

  //Check password
  if (!password) {
    throw new Error("Password is not valid");
  }

  if (typeof password !== "string") {
    throw new Error("Password is not valid");
  }

  if (!userValidationRegex.isPassword.test(password)) {
    throw new Error("Password is not valid");
  }
  resultData.password = password;

  return resultData;
};

const authentificate = async (req, res, next) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res.status(500).send({
      status: "ERROR",
      error: "userName or password is NOT FOUND",
    });
  }

  const user = await userModule.findOne({ userName });
  //check whether user exists or not
  if (!user) {
    return res
      .status(404)
      .json({ error: "User is not found: invalid username" });
  }
  //check user's status
  if (user.blocked) {
    return res
      .status(403)
      .json({ error: "This account has been bloced by Admin" });
  }
  //check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid or password" });
  }

  const token = generateToken(user._id);
  req.token = token;
  next();
};

const generateToken = (id) => {
  return jwt.sign({ id }, "&+!freePaySecret@#", { expiresIn: "1hr" });
};

module.exports = {
  register,
  login,
  authentificate,
};
