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

var tickerSlide = new Swiper('.ticker', {
    autoplay: {
        delay: 5000
    },
    loop: true,
    navigation: {
        nextEl: '.arrow__right',
        prevEl: '.arrow__left',
    },
})

var mySwiper = new Swiper('.popular__inner', {
    slidesPerView: 3,
    loop: true,
    spaceBetween: 20,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        bulletActiveClass: 'active',
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + ++index + '</span>';
        },
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        320: {
          slidesPerView: 1,
        },
        480: {
          slidesPerView: 2,
        },
        940: {
          slidesPerView: 3,
        }
      }
})

var announceSlider = new Swiper('.announce-slider', {
    slidesPerView: 1,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: {
        delay: 5000
    },
})


