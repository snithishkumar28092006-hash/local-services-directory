// Theme Selector
const themeSelector = document.getElementById("themeSelector");
themeSelector.addEventListener("change", () => {
    const theme = themeSelector.value;

    if (theme === "blue") document.documentElement.style.setProperty("--theme", "var(--blue)");
    if (theme === "purple") document.documentElement.style.setProperty("--theme", "var(--purple)");
    if (theme === "green") document.documentElement.style.setProperty("--theme", "var(--green)");
});

// Dark/Light Mode
const modeBtn = document.getElementById("modeToggle");
modeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        modeBtn.textContent = "☀️";
    } else {
        modeBtn.textContent = "🌙";
    }
});

