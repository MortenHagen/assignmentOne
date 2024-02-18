document.addEventListener("DOMContentLoaded", function() {
    const menuItems = document.querySelectorAll(".main-menu li");
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

    

});
