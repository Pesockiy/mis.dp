import Swiper from 'swiper';

const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    loop: true,
    autoplay: {
        delay: 5000,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.arrow__right',
        prevEl: '.arrow__left',
    }
});


let timeNode = document.querySelector('.date__time');

let getCurrentTimeString = () => {
    return new Date().toTimeString().replace(/ .*/, '');
}

setInterval(
    () => timeNode.innerHTML = getCurrentTimeString(),
    1000
);


//accordion nav menu
window.addEventListener('click', (e) => {
    let target = e.target,
        mainNavLinks = document.querySelectorAll('.main-nav__link');

    if (!target.classList.contains('main-nav__link')) return;
    
    e.preventDefault();

    mainNavLinks.forEach(link => {
        link.classList.remove('active');
    });

    target.classList.add('active');
})