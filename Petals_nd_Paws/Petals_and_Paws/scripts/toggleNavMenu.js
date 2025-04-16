// Toggle menu visibility on click (mobile)
function toggleMenu() {
    let menu = document.querySelector(".menu");
    let content = document.querySelector(".content");

    menu.classList.toggle("active");

    if (window.innerWidth <= 768) {
        if (menu.classList.contains("active")) {
            content.style.marginTop = "220px"; // Adjust as needed
        } else {
            content.style.marginTop = "0";
        }
    } else {
        content.style.marginTop = "0"; // Reset on desktop
    }
}

// Enable dropdown click toggle on mobile
document.querySelectorAll(".dropdown-toggle").forEach(toggle => {
    toggle.addEventListener("click", function (event) {
        event.preventDefault();
        this.parentElement.classList.toggle("active");
    });
});

// Reset margin on window resize (fixes issue when resizing from mobile to desktop)
window.addEventListener("resize", function () {
    let content = document.querySelector(".content");
    if (window.innerWidth > 768) {
        content.style.marginTop = "0"; // Ensure normal layout on desktop
    }
});
