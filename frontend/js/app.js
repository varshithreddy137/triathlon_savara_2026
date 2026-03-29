const API = "http://localhost:5000";
const express= require("express");
const app = express();

/* LOGIN */
async function userLogin() {
  const res = await fetch(API + "/api/user/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  });

  const data = await res.json();

  if (data.success === true) {
    window.location.href = "home.html";
  } else {
    alert("Login failed");
  }
}

/* REGISTER */
async function register() {
  await fetch(API + "/api/user/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  });

  window.location.href = "login.html";
}

/* PRODUCTS */
async function loadProducts() {
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

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(p => {
    list.innerHTML += `
      <div class="product">
        <h4>${p.name}</h4>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id}, '${p.name}', '${p.price}')">Cart</button>
      </div>
    `;
  });
}

/* CART */
function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  cart.push({ id, name, price });
  localStorage.setItem("cartItems", JSON.stringify(cart)); 
}

/* ORDER */
async function placeOrder() {

  const itemStr = localStorage.getItem("buyNowItem");
  const item = itemStr ? JSON.parse(itemStr) : null;
  const items = [item] ? [item] : []; 



  await fetch(API + "/api/orders", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      items,
      name: name.value,
      card: card.value
    })
  });

  alert("Order placed!");
}

/* ADMIN */
function checkAdmin() {
  if (!localStorage.getItem("admin")) return;
}

async function adminLogin() {
  const res = await fetch(API + "/api/admin/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  });

  const data = await res.json();

  if (data.success) {
    localStorage.setItem("admin", "true");
    window.location.href = "dashboard.html";
  }
}