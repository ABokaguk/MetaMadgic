document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav .link');

    function setActiveLink() {
        const currentScroll = window.scrollY;
        const windowHeight = window.innerHeight;
        const sections = document.querySelectorAll('section[id]');

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (currentScroll >= sectionTop - windowHeight / 2 && currentScroll < sectionTop + sectionHeight) {
                const id = section.getAttribute('id');
                const correspondingLink = document.querySelector(`.nav .link[href="#${id}"]`);
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            navLinks.forEach(link => link.classList.remove('active'));

            this.classList.add('active');

            const targetId = this.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const sectionTop = targetSection.offsetTop;
                window.scrollTo({ top: sectionTop, behavior: 'smooth' });
            }
        });
    });
});
