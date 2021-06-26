// import Swiper from 'swiper';


import $ from 'jquery';
global.jQuery = $;
global.$ = $;
global.jQuery = global.$ = $;
import 'owl.carousel';


let timeNode = document.querySelector('.date__time');

let getCurrentTimeString = () => {
    return new Date().toTimeString().replace(/ .*/, '');
}

setInterval(
    () => timeNode.innerHTML = getCurrentTimeString(),
    1000
);

//accordion nav menu
window.addEventListener('click', e => {
    let target = e.target,
        mainNavLinks = document.querySelectorAll('.main-nav__link');

    if (!target.classList.contains('main-nav__link')) return;

    e.preventDefault();

    mainNavLinks.forEach(link => {
        link.classList.remove('active');
    });

    target.classList.add('active');
})

//owl
$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    dots: true,
    nav: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 3
        }
    }
})

$('.owl-controls span').click(function () {
    var owl = $('.owl-carousel');
    owl.trigger('to.owl.carousel', [$(this).index(), 300]);
});
