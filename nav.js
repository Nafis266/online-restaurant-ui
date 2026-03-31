
const NAV_HTML = `
<nav>
  <a href="menu.html" class="nav-brand">Zaika <span>·</span></a>
  <ul class="nav-links">
    <li><a href="menu.html">Menu</a></li>
    <li><a href="reservation.html">Reservation</a></li>
    <li><a href="feedback.html">Feedback</a></li>
  </ul>
  <button class="nav-cart-btn" onclick="toggleCart()">
    Order
    <span class="cart-badge" id="cart-count">0</span>
  </button>
</nav>`;

const CART_HTML = `
<div class="cart-overlay" id="cart-overlay" onclick="toggleCart()"></div>
<div class="cart-panel" id="cart-panel">
  <div class="cart-header">
    <h2>Your Order</h2>
    <button class="cart-close" onclick="toggleCart()">✕</button>
  </div>
  <div class="cart-items" id="cart-items">
    <div class="cart-empty">
      <div class="cart-empty-icon"></div>
      Your cart is empty.<br>Add dishes from the menu.
    </div>
  </div>
  <div class="cart-footer" id="cart-footer" style="display:none;">
    <div class="cart-total">
      <span>Total</span>
      <span>₹<span id="cart-total">0</span></span>
    </div>
    <button class="btn-primary" onclick="placeOrder()">Place Order</button>
  </div>
</div>`;

const TOAST_HTML = `<div class="success-toast" id="toast"></div>`;

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
  document.body.insertAdjacentHTML('beforeend', CART_HTML + TOAST_HTML);
});
