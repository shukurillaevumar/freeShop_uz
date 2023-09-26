const authorize = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Authorization token not found" });
  }
};

module.exports = {
  authorize,
};
