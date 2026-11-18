// Small helpers used on every page

// Put this page's year in the footer
document.getElementById("year").textContent = new Date().getFullYear();

// Open and close the mobile menu
const toggle = document.querySelector(".menu-toggle");
toggle.onclick = () => {
  const open = document.getElementById("nav").classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
};

// If a photo file is missing, show a little flower instead
const PLACEHOLDER = "data:image/svg+xml," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><rect width="400" height="500" fill="#fdeccb"/>' +
  '<g transform="translate(200 230)"><g fill="#d0603f"><ellipse cy="-70" rx="38" ry="62"/><ellipse cy="-70" rx="38" ry="62" transform="rotate(144)"/><ellipse cy="-70" rx="38" ry="62" transform="rotate(288)"/></g>' +
  '<g fill="#f3b94f"><ellipse cy="-70" rx="38" ry="62" transform="rotate(72)"/><ellipse cy="-70" rx="38" ry="62" transform="rotate(216)"/></g><circle r="28" fill="#fdeccb" stroke="#fff" stroke-width="6"/></g>' +
  '<path d="M200 300 V470" stroke="#b9a15a" stroke-width="6"/></svg>');
document.addEventListener("error", e => {
  const el = e.target;
  if (el.tagName === "IMG" && el.getAttribute("src") && el.src !== PLACEHOLDER) el.src = PLACEHOLDER;
}, true);
