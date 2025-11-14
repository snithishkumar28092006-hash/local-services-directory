/* =========================
   Sample data - replace/add your real listings here
   ========================= */
const data = [
  {
    category: "Plumbers",
    services: [
      { name: "Kumar Plumbing Service", phone: "+919876543210", location: "Anna Nagar", notes: "Home & commercial" },
      { name: "WaterFix Plumbers", phone: "+919988776655", location: "Velachery", notes: "Leak & pipe replacement" }
    ]
  },
  {
    category: "Electricians",
    services: [
      { name: "Hari Electricals", phone: "+919090909090", location: "T. Nagar", notes: "Wiring, stabilizers" },
      { name: "SparkFix Electricians", phone: "+918888888888", location: "Adyar", notes: "AC & appliances" }
    ]
  },
  {
    category: "Tutors",
    services: [
      { name: "Sai Maths Tutor", phone: "+919700000001", location: "Online / OMR", notes: "11-12 / JEE basics" },
      { name: "Priya Home Tutor", phone: "+919700000002", location: "Local", notes: "Primary & middle" }
    ]
  }
];

/* =========================
   DOM references
   ========================= */
const categoryContainer = document.getElementById("categoryContainer");
const searchBox = document.getElementById("searchBox");
const clearSearch = document.getElementById("clearSearch");
const addListing = document.getElementById("addListing");
const yearEl = document.getElementById("year");

/* =========================
   Utility: render categories
   ========================= */
function renderCategories(filter = "") {
  const q = filter.trim().toLowerCase();
  categoryContainer.innerHTML = "";

  data.forEach(cat => {
    // Filter services within the category
    const matchedServices = cat.services.filter(s => {
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        (s.notes && s.notes.toLowerCase().includes(q)) ||
        cat.category.toLowerCase().includes(q)
      );
    });

    if (matchedServices.length === 0) return;

    const catEl = document.createElement("div");
    catEl.className = "category glass";
    catEl.innerHTML = `
      <div class="category-header">
        <h3>${cat.category}</h3>
        <div class="meta">${matchedServices.length} result(s)</div>
      </div>
      <div class="service-list"></div>
    `;

    const listEl = catEl.querySelector(".service-list");
    matchedServices.forEach(s => {
      const sEl = document.createElement("div");
      sEl.className = "service";
      sEl.innerHTML = `
        <div class="left">
          <strong>${s.name}</strong>
          <small>${s.location} • ${s.notes || ""}</small>
        </div>
        <div class="right">
          <a class="call-btn" href="tel:${s.phone.replace(/\s+/g,'')}" aria-label="Call ${s.name}">${s.phone}</a>
        </div>
      `;
      listEl.appendChild(sEl);
    });

    categoryContainer.appendChild(catEl);
  });

  if (!categoryContainer.hasChildNodes()) {
    categoryContainer.innerHTML = `<div class="glass" style="padding:22px;text-align:center">No results. Try another search term.</div>`;
  }
}

/* =========================
   Search handlers
   ========================= */
searchBox.addEventListener("input", (e) => {
  renderCategories(e.target.value);
});
clearSearch.addEventListener("click", () => {
  searchBox.value = "";
  renderCategories("");
});

/* =========================
   Theme + mode controls
   ========================= */
const themeSelector = document.getElementById("themeSelector");
const modeBtn = document.getElementById("modeToggle");
const body = document.body;

function applyTheme(theme) {
  // Remove theme classes
  body.classList.remove("light-theme", "dark-theme", "purple-theme", "green-theme");
  if (theme === "light") body.classList.add("light-theme");
  else if (theme === "dark") body.classList.add("dark-theme");
  else if (theme === "purple") body.classList.add("purple-theme");
  else if (theme === "green") body.classList.add("green-theme");

  localStorage.setItem("site-theme", theme);
}

themeSelector.addEventListener("change", (e) => applyTheme(e.target.value));

// Mode toggle (quick swap between light and dark)
modeBtn.addEventListener("click", () => {
  const current = localStorage.getItem("site-theme") || "dark";
  if (current === "light") {
    themeSelector.value = "dark";
    applyTheme("dark");
    modeBtn.textContent = "🌙";
  } else {
    themeSelector.value = "light";
    applyTheme("light");
    modeBtn.textContent = "☀️";
  }
});

/* Load saved theme on startup */
(function loadSavedTheme() {
  const saved = localStorage.getItem("site-theme") || "dark";
  themeSelector.value = saved;
  applyTheme(saved);
  modeBtn.textContent = (saved === "light") ? "☀️" : "🌙";
})();

/* =========================
   Extra UI actions
   ========================= */
addListing.addEventListener("click", (e) => {
  // Example: link to a Google Form you create to collect listings
  // Replace with your real form URL or remove.
  e.preventDefault();
  const formUrl = "https://forms.gle/your-google-form-here"; // <-- replace with actual form if you have one
  window.open(formUrl, "_blank");
});

/* Year in footer */
yearEl.textContent = new Date().getFullYear();

/* Initial render */
renderCategories();
