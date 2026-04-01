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
// toast
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.style.display = 'block';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.style.display = 'none'; }, 3000);
}

function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === page);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
  setActiveNav();
});
(function () {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x      = Math.random() * (W || 600);
      this.y      = init ? Math.random() * (H || 800) : (H || 800) + 10;
      this.size   = Math.random() * 4 + 1.5;
      this.speedY = -(Math.random() * 0.6 + 0.2);
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.alpha  = Math.random() * 0.6 + 0.2;
      this.decay  = Math.random() * 0.002 + 0.001;
      this.type   = ['dot','dot','dot','leaf','ring'][Math.floor(Math.random() * 5)];
      const palette = ['#d4a254','#e8c17a','#b8860b','#fff8f0','#c8a96e'];
      this.color  = palette[Math.floor(Math.random() * palette.length)];
    }
    update() {
      this.y      += this.speedY;
      this.alpha  -= this.decay;
      if (this.alpha <= 0 || this.y < -20) this.reset(false);
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle   = this.color;
      ctx.strokeStyle = this.color;
      ctx.translate(this.x, this.y);
      if (this.type === 'dot') {
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.type === 'ring') {
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 1.5, 0, Math.PI * 2);
        ctx.lineWidth = 0.8;
        ctx.stroke();
      } else if (this.type === 'leaf') {
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 2, this.size, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function resize() {
    const parent = canvas.parentElement;
    W = canvas.width  = parent.offsetWidth;
    H = canvas.height = parent.offsetHeight;
  }

  const particles = Array.from({ length: 60 }, () => new Particle());

  (function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  })();

  window.addEventListener('resize', resize);

  // KEY FIX — wait for full layout before reading dimensions
  if (document.readyState === 'complete') {
    resize();
  } else {
    window.addEventListener('load', resize);
  }
})();
