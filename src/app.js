const express = require("express");

const categoryRoutes = require("./routes/categoryRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const productRoutes = require("./routes/productRoutes");
const stockMovementRoutes = require("./routes/stockMovementRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API funcionando");
});

app.use("/categories", categoryRoutes);
app.use("/suppliers", supplierRoutes);
app.use("/products", productRoutes);
app.use("/stock-movements", stockMovementRoutes);

module.exports = app;