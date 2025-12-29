document.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector(".loader");
    if (loader) loader.style.display = "block"; // Show the loader when the DOM is loaded
    document.body.style.overflow = "hidden"; // Disable scrolling
    console.log("Loader displayed"); // Log to the console
});

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    if (loader) {
        setTimeout(() => {
            loader.style.display = "none"; // Hide the loader after a certain amount of time
            document.body.style.overflow = "auto"; // Enable scrolling
        }, 1); // Delay
    }
});