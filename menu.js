const MENU_ITEMS = [
  {
    name: 'Thalassery Biriyani',
    price: 180,
    desc: 'Fragrant long-grain rice slow-cooked with tender chicken, whole spices, and caramelised onions.',
    tag: 'non',
  },
  {
    name: 'Paneer Tikka Masala',
    price: 150,
    desc: 'Char-grilled cottage cheese cubes bathed in a rich, smoky tomato and cream sauce.',
    tag: 'veg',
  },
  {
    name: 'Masala Dosa',
    price: 80,
    desc: 'Crispy golden crepe filled with spiced potato, served with coconut chutney and sambar.',
    tag: 'veg',
  },
  {
    name: 'Mutton Rogan Josh',
    price: 200,
    desc: 'Slow-braised Kashmiri lamb in a heady sauce of aromatic whole spices and dried chilies.',
    tag: 'non',
  },
  {
    name: 'Chicken Shawarma',
    price: 160,
    desc: 'Marinated chicken cooked on a vertical spit, wrapped with garlic sauce and fresh vegetables.',
    tag: 'non',
  },
  {
    name: 'Dal Makhani',
    price: 130,
    desc: 'Black lentils simmered overnight with butter and cream.. a North Indian comfort classic.',
    tag: 'veg',
  },
];

function renderMenu() {
  const grid = document.getElementById('menu-grid');
  grid.innerHTML = MENU_ITEMS.map((item, i) => `
    <div class="menu-card">
      <div class="menu-card-top">
        <h3>${item.name}</h3>
        <span class="menu-card-tag tag-${item.tag}">
          ${item.tag === 'veg' ? '● Veg' : '● Non-veg'}
        </span>
      </div>
      <p class="menu-card-desc">${item.desc}</p>
      <div class="menu-card-footer">
        <div class="menu-price">₹${item.price} <span>/ plate</span></div>
        <button class="add-btn" id="addbtn-${i}" onclick="handleAdd(${i})">+ Add</button>
      </div>
    </div>
  `).join('');
}

function handleAdd(index) {
  const item = MENU_ITEMS[index];
  addToCart(item.name, item.price);

  const btn = document.getElementById(`addbtn-${index}`);
  btn.textContent = '✓ Added';
  btn.classList.add('added');
  setTimeout(() => {
    btn.textContent = '+ Add';
    btn.classList.remove('added');
  }, 1400);

  showToast(`${item.name} added to your order`);
}

document.addEventListener('DOMContentLoaded', renderMenu);
