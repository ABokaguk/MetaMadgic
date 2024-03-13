document.addEventListener('DOMContentLoaded', function () {
    var introText = document.getElementById('introText');

    function checkPosition() {
        var position = introText.getBoundingClientRect().bottom; 
        var screenHeight = window.innerHeight;

        if (position < screenHeight * 0.9 && position > -screenHeight * 0.9) {
            introText.classList.add('show');
            introText.classList.remove('hide');
        } else {
            introText.classList.remove('show');
            introText.classList.add('hide');
        }
    }

    function handleScroll() {
        setTimeout(checkPosition, 100); 
        var sections = document.querySelectorAll('.box');
        sections.forEach(function(section) {
            if (section.id !== 'introduction') {
                var position = section.getBoundingClientRect().bottom;
                var screenHeight = window.innerHeight;
                if (position < screenHeight * 0.75 && position > -screenHeight * 0.25) {
                    introText.classList.remove('show');
                }
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
});

