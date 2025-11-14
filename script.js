const data = [
    {
        category: "Plumbers",
        services: [
            { name: "Kumar Plumbing Service", phone: "9876543210", location: "Chennai" },
            { name: "WaterFix Plumbers", phone: "9988776655", location: "Bangalore" }
        ]
    },
    {
        category: "Electricians",
        services: [
            { name: "Hari Electricals", phone: "9090909090", location: "Coimbatore" },
            { name: "SparkFix Electricians", phone: "8888888888", location: "Hyderabad" }
        ]
    }
];

const categoryList = document.getElementById("category-list");
const searchBox = document.getElementById("searchBox");

function loadCategories(filter = "") {
    categoryList.innerHTML = "";

    data.forEach(cat => {
        const filtered = cat.services.filter(s =>
            s.name.toLowerCase().includes(filter) ||
            s.location.toLowerCase().includes(filter) ||
            cat.category.toLowerCase().includes(filter)
        );

        if (filtered.length === 0) return;

        const div = document.createElement("div");
        div.className = "category";

        div.innerHTML = `<h2>${cat.category}</h2>`;

        filtered.forEach(service => {
            div.innerHTML += `
                <div class="service">
                    <strong>${service.name}</strong><br>
                    Phone: ${service.phone}<br>
                    Location: ${service.location}
                </div>
            `;
        });

        categoryList.appendChild(div);
    });
}

searchBox.addEventListener("input", (e) => {
    loadCategories(e.target.value.toLowerCase());
});

loadCategories();
