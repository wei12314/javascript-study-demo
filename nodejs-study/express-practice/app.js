const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello Node.js"));

app.listen(port, () => {
  console.log(`This app is run in port: ${port}`);
});

app.get("/products", (req, res) => {
  const products = [
    { id: 1, name: "hammer" },
    { id: 2, name: "hh" },
    { id: 3, name: "glove" },
  ];
  res.json(products);
});
