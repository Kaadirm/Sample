const express = require("express");
const cors = require("cors");
const { ProductData, addProduct } = require("./products");

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api", (req, res) => {
  res.json(ProductData);
});

app.post("/api", (req, res) => {
  const request = req.body;
  addProduct(request)
  res.status(201).json(ProductData);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
