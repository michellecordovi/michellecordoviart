// Shop page: shows products from products.json, with filter and sort
const grid = document.getElementById("shop-grid");
let products = [];
let filter = "all";
let sort = "featured";

const money = n => "$" + (n % 1 ? n.toFixed(2) : n);
const lowest = p => p.type === "print" ? Math.min(...p.sizes.map(s => s.price)) : p.price;

function card(p) {
  const sold = p.type === "original" && p.available === false;
  const price = sold ? '<span class="sold">Sold</span>' : (p.type === "print" ? "From " : "") + money(lowest(p));
  return `<a class="card" href="product.html?id=${p.id}">
    <div class="thumb"><img src="${p.images[0]}" alt="${p.title}"></div>
    <h3>${p.title}</h3>
    <p class="meta">${p.type === "print" ? "Print" : "Original"}, ${p.medium || ""}</p>
    <p class="price">${price}</p>
  </a>`;
}

function draw() {
  let list = products.filter(p => filter === "all" || p.type === filter);
  if (sort === "low") list.sort((a, b) => lowest(a) - lowest(b));
  if (sort === "high") list.sort((a, b) => lowest(b) - lowest(a));
  grid.innerHTML = list.length ? list.map(card).join("") : "<p>Nothing here yet.</p>";
  document.querySelectorAll(".chip").forEach(c => c.classList.toggle("on", c.dataset.filter === filter));
}

document.querySelectorAll(".chip").forEach(c => c.onclick = () => { filter = c.dataset.filter; draw(); });
document.getElementById("sort").onchange = e => { sort = e.target.value; draw(); };

fetch("products.json").then(r => r.json())
  .then(data => { products = data; draw(); })
  .catch(() => { grid.innerHTML = "<p>Couldn't load products.json. If you opened this file by double-clicking it, use a local server (like the VS Code Live Server extension) or upload the site to your host.</p>"; });
