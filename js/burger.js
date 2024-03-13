document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.header_burger');
    const menu = document.querySelector('.menu');

    burgerMenu.addEventListener('click', function() {
        menu.classList.toggle('show');
    });
});
