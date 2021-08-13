if (document.querySelector('.b-mobile')) {
    let mobileNav = document.querySelector('.b-mobile');
    let hamburgerButton = document.querySelector('.hamburger');
    let body = document.body;
    mobileNav.querySelector('.nav__list').style.height = window.innerHeight / 2 + 'px';

    hamburgerButton.addEventListener('click', () => {
        if (mobileNav.classList.contains('active')) {
            body.classList.remove('hidden');
            mobileNav.classList.remove('active');
            hamburgerButton.classList.remove('active');
        } else {
            body.classList.add('hidden');
            mobileNav.classList.add('active');
            hamburgerButton.classList.add('active');
        }
    });
}
