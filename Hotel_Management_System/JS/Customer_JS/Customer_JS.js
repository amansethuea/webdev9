// const swiper = new Swiper('.swiper', {
//     // Optional parameters
//     direction: 'vertical',
//     loop: true,
//
//     // If we need pagination
//     pagination: {
//         el: '.swiper-pagination',
//     },
//
//     // Navigation arrows
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
//
//     // And if we need scrollbar
//     scrollbar: {
//         el: '.swiper-scrollbar',
//     },
// });


// {
//     "devDependencies": {
//     "serve": "^11.2.0"
// },
//     "main": "index.html",
//     "name": "swiper-pagination-custom",
//     "scripts": {
//     "build": "echo This is a static template, there is no bundler or bundling involved!",
//         "start": "serve"
// },
//     "tags": [
//     "swiper"
// ]
// }

var addclass = 'selected_room';
var $cols = $('.room').click(function(e) {
    $cols.removeClass(addclass);
    $(this).addClass(addclass);
});