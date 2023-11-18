// <!-- Initialize Swiper -->
//
// var swiper = new Swiper(".mySwiper", {
//     pagination: {
//         el: ".swiper-pagination",
//         clickable: true,
//         renderBullet: function (index, className) {
//             return '<span class="' + className + '">' + (index + 1) + "</span>";
//         },
//     },
// });
document.addEventListener("DOMContentLoaded", function() {
    var swiper = new Swiper(".mySwiper", {
        speed: 600,
        parallax: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
});