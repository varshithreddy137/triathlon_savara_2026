🐞 Bug Byte – Debugging & Security Challenge

Welcome to Bug Byte, a full-stack debugging and security challenge designed to test your skills in:

- 🧩 UI Debugging
- ⚙️ Logic & API Fixing
- 🔐 Security Analysis

---

📁 Repository Structure

bug-byte/
│
├── clean-version/        # Original working version (no bugs)
├── bugged-version/       # Contest version (with intentional bugs)
├── docs/
│   └── bug_list.pdf      # Organizer reference (DO NOT OPEN if participant)
│
└── README.md

---

🎯 Objective

Your goal is to:

1. Identify bugs in the system
2. Fix them correctly
3. (Bonus) Explain critical issues

---

⚠️ Important Rules

- ❌ Do NOT modify the clean version
- ❌ Do NOT rewrite the entire project
- ✅ Fix only the bugs
- ✅ Use browser DevTools freely
- ⚠️ Do NOT open the PDF unless instructed

---

🚀 Getting Started

1. Clone the repository

git clone <your-repo-link>
cd bug-byte

---

2. Run Backend

cd bugged-version/backend
npm install
node server.js

Server runs on:

http://localhost:5000

---

3. Run Frontend

Just open:

bugged-version/frontend/user/login.html

in your browser

---

🐞 Bug Categories

The project contains 30 intentional bugs, divided into:

Type| Description
🎨 UI| Layout, styling, visibility
⚙️ Logic| JS flow, incorrect conditions
🔌 API| Wrong endpoints, broken calls
🔐 Security| Auth bypass, data leaks

---

🏁 Challenge Levels

Level| Focus
Easy| UI Issues
Medium| Logic + API
Hard| System flow
Very Hard| Security vulnerabilities

---

📄 Submission Guidelines

You can submit:

- ✅ Fixed code
  OR
- ✅ Bug list with explanations

Bonus points for:

- 💡 Clean fixes
- 🔍 Deep analysis
- 🔐 Security explanations


---

🎉 Good Luck!

This challenge is designed to simulate real-world debugging scenarios.

Think like a developer.
Debug like an engineer.
Break it like a hacker 😈

---

👨‍💻 Credits

Developed for technical events and competitions.


Bug list:
  
1) position: absolute;
   left: 15px;

2) button {
  padding: 8px;
  background: #3b82f6;
  color: #000000; /* BUG */
}

3) .center-box h2 {
  color: #000000; /* BUG */
}

4) <input id="username" placeholder="Username">
<input id="password" type="password" placeholder="Password">

5) const res = await fetch(API + "/api/products");

6) function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  cart.push({ id, name, price });
  localStorage.setItem("cartItems", JSON.stringify(cart)); 
}

7) const itemStr = localStorage.getItem("buyNowItem");
   const item = itemStr ? JSON.parse(itemStr) : null;
   const items = [item] ? [item] : []; 

8)  res.json({ success: user !== undefined });

9) res.json({ success: req.body.username === ADMIN.username && req.body.password === ADMIN.password }); 

10) <a href="cart.html">Cart</a>
    <a href="register.html">Register</a>
    <a href="login.html">Back</a>

11)     <h4>${p.name}</h4>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id}, '${p.name}', '${p.price}')">Cart</button>
      </div>

12)  
 let data;
  try {
    const res = await fetch(API + "/api/products");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    data = await res.json();
  } catch(error) {
    console.error("Error fetching products:", error);
    return;
  }

13) /* REGISTER */
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


14) /* PRODUCTS */
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


15) /* ADMIN */
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

16) /* PRODUCTS */
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
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ success: false, message: "Invalid product ID" });
  }

  const initialLength = products.length;
  products = products.filter(p => p.id !== id);

  if (products.length === initialLength) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  res.json({ success: true });
});


