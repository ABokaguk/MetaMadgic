document.addEventListener('DOMContentLoaded', function () {
    var mySwiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
    
});
document.addEventListener('DOMContentLoaded', function() {
    const mediaQuery = window.matchMedia('(max-width: 430px)');
    const text = document.querySelector('.chairman-text p');
    const readMoreBtn = document.querySelector('.read-more-btn');

    if (mediaQuery.matches) {
        text.classList.add('hidden');

        readMoreBtn.addEventListener('click', function() {
            text.classList.toggle('hidden');
            if (text.classList.contains('hidden')) {
                this.textContent = 'READ MORE';
            } else {
                this.textContent = 'CLOSED';
            }
        });
    }
});
