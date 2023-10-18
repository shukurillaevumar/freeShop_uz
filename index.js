const express = require("express");
const v1UserRouter = require("./src/v1/routes/user.router");
const v1ProductRouter = require("./src/v1/routes/product.router");
const v1CategoryRouter = require("./src/v1/routes/category.router");
const v1CartsRouter = require("./src/v1/routes/cart.router");
const app = express();
const dbConnect = require("./src/v1/database/db.connections");

app.use("/api/v1/users", v1UserRouter);
app.use("/api/v1/products", v1ProductRouter);
app.use("/api/v1/categories", v1CategoryRouter);
app.use("/api/v1/carts", v1CartsRouter);
app.use(express.json());

const PORT = 3000;
dbConnect();
app.get("/", (req, res) => {
  res.send("<h2>It's working !!</h2>");
});

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
