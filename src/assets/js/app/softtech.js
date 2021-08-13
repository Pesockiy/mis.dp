
if (document.querySelector('.softtech')) {
    let delayToSlide = 5000;

    const sliderBanner = new Swiper('.softtech', {
        loop: true,
        autoplay: {
            delay: delayToSlide,
        },
        slidesPerView: 1,
        iOSEdgeSwipeDetection: true,
    });
}