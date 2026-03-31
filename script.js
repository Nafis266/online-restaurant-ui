function getCart() {
  return JSON.parse(sessionStorage.getItem('zaika_cart') || '[]');
}
function saveCart(cart) {
  sessionStorage.setItem('zaika_cart', JSON.stringify(cart));
}

function addToCart(name, price) {
  const cart = getCart();
  const existing = cart.find(c => c.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  saveCart(cart);
  updateCartUI();
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  updateCartUI();
  renderCartItems();
}

function placeOrder() {
  saveCart([]);
  updateCartUI();
  renderCartItems();
  toggleCart();
  showToast('Order placed! Your food is being prepared.');
}

/* ─── CART UI ─── */
function updateCartUI() {
  const cart = getCart();
  const count = cart.reduce((a, c) => a + c.qty, 0);
  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = count;
}

function renderCartItems() {
  const cart = getCart();
  const itemsEl = document.getElementById('cart-items');
  const footer = document.getElementById('cart-footer');
  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon"></div>
        Your cart is empty.<br>Add dishes from the menu.
      </div>`;
    if (footer) footer.style.display = 'none';
  } else {
    const total = cart.reduce((a, c) => a + c.price * c.qty, 0);
    itemsEl.innerHTML = cart.map((item, i) => `
      <div class="cart-item">
        <div>
          <div class="cart-item-name">${item.name}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px;">Qty: ${item.qty}</div>
        </div>
        <div style="display:flex;align-items:center;gap:4px;">
          <span class="cart-item-price">₹${item.price * item.qty}</span>
          <button class="cart-item-remove" onclick="removeFromCart(${i})">✕</button>
        </div>
      </div>`).join('');
    if (footer) {
      footer.style.display = 'block';
      document.getElementById('cart-total').textContent = total;
    }
  }
}

function toggleCart() {
  document.getElementById('cart-panel').classList.toggle('open');
  document.getElementById('cart-overlay').classList.toggle('open');
  renderCartItems();
}

/* ─── TOAST ─── */
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.style.display = 'block';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.style.display = 'none'; }, 3000);
}

/* ─── ACTIVE NAV LINK ─── */
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === page);
  });
}

/* ─── ON LOAD ─── */
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
  setActiveNav();
});
