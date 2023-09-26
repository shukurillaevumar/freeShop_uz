const express = require("express");
const v1UserRouter = require("./src/v1/routes/user.router");
const app = express();
const dbConnect = require("./src/v1/database/db.connections");

app.use("/api/v1/users", v1UserRouter);
app.use(express.json());

const PORT = 3000;
dbConnect();
app.get("/", (req, res) => {
  res.send("<h2>It's working !!</h2>");
});

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});