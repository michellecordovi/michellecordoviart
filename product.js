// Product page: shows one product from products.json (the id comes from ?id= in the address)
const box = document.getElementById("product");
const id = new URLSearchParams(location.search).get("id");
const money = n => "$" + (n % 1 ? n.toFixed(2) : n);

fetch("products.json").then(r => r.json())
  .then(products => show(products.find(p => p.id === id)))
  .catch(() => { box.innerHTML = "<p>Couldn't load products.json. If you opened this file by double-clicking it, use a local server (like the VS Code Live Server extension) or upload the site to your host.</p>"; });

function show(p) {
  if (!p) { box.innerHTML = "<h2>Product not found</h2>"; return; }
  document.title = p.title + " · Your Name";
  const isPrint = p.type === "print";
  const sold = !isPrint && p.available === false;

  box.className = "product";
  box.innerHTML = `
    <div>
      <div class="main-img"><img id="main-photo" src="${p.images[0]}" alt="${p.title}"></div>
      ${p.images.length > 1 ? `<div class="thumbs">${p.images.map((src, i) =>
        `<button class="${i ? "" : "on"}" data-src="${src}" aria-label="Photo ${i + 1}"><img src="${src}" alt=""></button>`).join("")}</div>` : ""}
    </div>
    <div>
      <h1 style="font-size:clamp(2rem,5vw,3rem)">${p.title}</h1>
      <p class="price" id="price"></p>
      ${isPrint ? `<label for="size">Size</label><select id="size">${p.sizes.map((s, i) => `<option value="${i}">${s.label}, ${money(s.price)}</option>`).join("")}</select>` : ""}
      <a class="btn" id="buy" href="#" target="_blank" rel="noopener">Buy now</a>
      <p style="margin-top:1.6rem">${p.description}</p>
      <p class="details">${isPrint ? "Print" : "Original"}, ${p.medium || ""}${p.size ? ", " + p.size : ""}</p>
    </div>`;

  const price = document.getElementById("price");
  const buy = document.getElementById("buy");

  function update() {
    if (sold) { price.textContent = "Sold"; buy.textContent = "Sold"; buy.className = "btn disabled"; buy.removeAttribute("href"); return; }
    const item = isPrint ? p.sizes[document.getElementById("size").value] : p;
    price.textContent = money(item.price);
    buy.href = item.stripeLink;
  }
  if (isPrint) document.getElementById("size").onchange = update;

  // Clicking a small photo shows it big
  document.querySelectorAll(".thumbs button").forEach(b => b.onclick = () => {
    document.getElementById("main-photo").src = b.dataset.src;
    document.querySelectorAll(".thumbs button").forEach(x => x.classList.toggle("on", x === b));
  });
  update();
}
