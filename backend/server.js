const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let USERS = [{ username: "user", password: "1234" }];
const ADMIN = { username: "admin", password: "1234" };

let products = [
  { id: 1, name: "MacBook Pro", price: 150000 },
  { id: 2, name: "iPhone", price: 80000 },
  { id: 3, name: "AirPods", price: 20000 }
];

let orders = [];

/* REGISTER */
app.post("/api/user/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password are required" });
  }

  const existingUser = USERS.find(u => u.username === username);
  if (existingUser) {
    return res.status(409).json({ success: false, message: "Username already exists" });
  }

  USERS.push({ username, password });
  res.json({ success: true });
});

/* LOGIN */
app.post("/api/user/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password required" });
  }

  const user = USERS.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  res.json({ success: true });
});

/* ADMIN */
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password required" });
  }

  if (username === ADMIN.username && password === ADMIN.password) {
    return res.json({ success: true });
  }

  res.status(401).json({ success: false, message: "Invalid admin credentials" });
});

/* PRODUCTS */
app.get("/api/products", (req, res) => res.json(products));

app.post("/api/products", (req, res) => {
  const { name, price } = req.body;
  if (!name || typeof name !== "string" || !price || typeof price !== "number") {
    return res.status(400).json({ success: false, message: "Invalid product data" });
  }

  const newProduct = {
    id: Date.now(),
    name: name.trim(),
    price
  };

  products.push(newProduct);
  res.status(201).json({ success: true, product: newProduct });
});

app.delete("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter(p => p.id !== id); // BUG
  res.json({ success: true });
});

/* ORDERS */
app.post("/api/orders", (req, res) => {
  orders.push(req.body); // BUG
  res.json({ success: true });
});

app.get("/api/orders", (req, res) => res.json(orders));

app.listen(5000, () => console.log("Server running on 5000"));