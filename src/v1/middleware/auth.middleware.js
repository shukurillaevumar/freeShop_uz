const userModule = require("../module/users/user.module");
const jwt = require("jsonwebtoken");
const authorize = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Authorization token not found" });
  }
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

const generateToken = async (id) => {
  return await jwt.sign({ id }, "&+!freePaySecret@#", { expiresIn: "1hr" });
};

module.exports = {
  authorize,
  authentificate,
  generateToken,
};
