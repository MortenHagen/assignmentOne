document.addEventListener("DOMContentLoaded", function() {
    const menuItems = document.querySelectorAll(".main-menu button");
    const images = document.querySelectorAll(".picture-container img");

    menuItems.forEach(item => {
        item.addEventListener("mouseover", function() {
            const dataImg = this.getAttribute("data-menu");
            images.forEach(img => {
                if (img.getAttribute("data-img") === dataImg) {
                    img.style.display = "block";
                } else {
                    img.style.display = "none";
                }
            });
        });
    });

    const buttons = document.querySelectorAll('button[data-menu]');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const selectedValue = this.dataset.menu;
            localStorage.setItem('storedValue', selectedValue);
            console.log("Stored Value:", selectedValue); // Just for testing, you can remove this line
        });
    });
});
