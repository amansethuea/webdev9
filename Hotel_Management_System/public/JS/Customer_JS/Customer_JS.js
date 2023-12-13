// Swipe between the images to go to next or previous one 
// Image swiper for customer gallery page
document.addEventListener("DOMContentLoaded", function() {
    var swiper = new Swiper(".mySwiper", {
        speed: 600,
        parallax: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';}
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
});


// Select all the image elements within the slides
let images = document.querySelectorAll('.swiper-image-container img'); // Select all the image elements within the slides
let image_paragraph = document.querySelectorAll('.swiper-hover-text'); // Select all the image hover paragraph elements within the slides

// Iterate over each image element
images.forEach(img => {
    // Create a new anchor element
    let anchor = document.createElement('a');

    // Set the href attribute of the anchor element
    anchor.href = 'room_booking.html';

    // Wrap the image with the anchor element
    anchor.appendChild(img.cloneNode(true));

    // Replace the image in the slide with the new anchor element
    img.parentNode.replaceChild(anchor, img);
});

image_paragraph.forEach(img => {
    // Create a new anchor element
    let anchor = document.createElement('a');

    // Set the href attribute of the anchor element
    anchor.href = 'room_booking.html';

    // Wrap the image with the anchor element
    anchor.appendChild(img.cloneNode(true));

    // Replace the image in the slide with the new anchor element
    img.parentNode.replaceChild(anchor, img);
});