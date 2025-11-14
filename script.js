// THEME SWITCHER
function changeTheme(theme) {
    document.body.className = "";
    if (theme === "purple") {
        document.body.classList.add("purple-theme");
    }
    localStorage.setItem("theme", theme);
}

// Load saved theme
if (localStorage.getItem("theme")) {
    changeTheme(localStorage.getItem("theme"));
}


// ============================
// 7 CATEGORY DATA (40+ each)
// ============================

const plumbing = Array.from({ length: 40 }, (_, i) => ({
    name: `Plumber Service ${i + 1}`,
    location: `Street ${i + 3}, Area ${i + 2}`
}));

const electricals = Array.from({ length: 40 }, (_, i) => ({
    name: `Electrical Shop ${i + 1}`,
    location: `Market Road ${i + 1}`
}));

const bakeries = Array.from({ length: 40 }, (_, i) => ({
    name: `Bakery & Cakes ${i + 1}`,
    location: `Food Street ${i + 4}`
}));

const petrolpumps = Array.from({ length: 40 }, (_, i) => ({
    name: `Petrol Pump ${i + 1}`,
    location: `Highway ${i + 10}`
}));

const temples = Array.from({ length: 40 }, (_, i) => ({
    name: `Temple ${i + 1}`,
    location: `Temple Street ${i + 6}`
}));

const schools = Array.from({ length: 40 }, (_, i) => ({
    name: `School ${i + 1}`,
    location: `School Road ${i + 9}`
}));

const stationery = Array.from({ length: 40 }, (_, i) => ({
    name: `Stationary Store ${i + 1}`,
    location: `Lane ${i + 5}`
}));


// STORE ALL CATEGORY REFERENCES
const categoryMap = {
    plumbing,
    electricals,
    bakeries,
    petrolpumps,
    temples,
    schools,
    stationery
};


// LOAD CATEGORY INTO UI
function loadCategory(category) {
    const list = categoryMap[category];
    let html = "";

    list.forEach(item => {
        html += `
            <div class="service-card">
                <h3>${item.name}</h3>
                <p>${item.location}</p>
            </div>
        `;
    });

    document.getElementById("serviceList").innerHTML = html;
}


// SEARCH FUNCTION
function searchItems() {
    let input = document.getElementById("searchBox").value.toLowerCase();
    let cards = document.getElementsByClassName("service-card");

    for (let card of cards) {
        let name = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = name.includes(input) ? "block" : "none";
    }
}
