let cart = [];
let total = 0;

function addToCart(item, price) {
  cart.push({ item, price });
  total += price;
  updateCart();
}

function updateCart() {
  let cartList = document.getElementById("cartList");
  let totalSpan = document.getElementById("total");

  if (!cartList) return;

  cartList.innerHTML = "";
  cart.forEach(c => {
    let li = document.createElement("li");
    li.textContent = `${c.item} - ₹${c.price}`;
    cartList.appendChild(li);
  });

  totalSpan.textContent = total;
}

function placeOrder() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }
  alert("Order placed successfully!");
  cart = [];
  total = 0;
  updateCart();
}

function reserveTable(e) {
  e.preventDefault();
  alert("Table reserved successfully!");
}

function submitFeedback(e) {
  e.preventDefault();
  alert("Thank you for your feedback!");
}

function enterSite(e) {
  e.preventDefault();
  window.location.href = "index2.html";
}

