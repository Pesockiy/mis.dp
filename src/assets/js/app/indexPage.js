let headerMiddle = document.querySelector('.header__bottom');

window.addEventListener('scroll', function () {
    if (pageYOffset > 0) {
        document.querySelector('.breadcrumb').closest('.container').classList.add('hide')
        headerMiddle.classList.add('hide');
    } else {
        headerMiddle.classList.remove('hide');
        document.querySelector('.breadcrumb').closest('.container').classList.remove('hide')
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

if (document.querySelector('.ticker')) {
    let tickerSlide = new Swiper('.ticker', {
        autoplay: {
            delay: 5000
        },
        allowTouchMove: false,
        loop: true,
        direction: 'vertical',
        navigation: {
            nextEl: '.arrow__right',
            prevEl: '.arrow__left',
        },
    })
}

if (document.querySelector('.popular__inner')) {
    let mySwiper = new Swiper('.popular__inner', {
        slidesPerView: 3,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            // clickable: true,
            bulletActiveClass: 'active',
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + ++index + '</span>';
            },
        },
        navigation: {
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 2,
            },
            1100: {
                slidesPerView: 2,
            },
            1150: {
                slidesPerView: 3,
            }
        }
    });

    // new code
    const getLastPageIndex = function (totalNumberOfItems, pageSize) {
        return Math.floor((totalNumberOfItems + pageSize - 1) / pageSize) - 1;
    }

    const getPageIndexOptions = function (totalNumberOfItems, maxNumberOfOptions, pageSize, pageIndex) {
        const options = [];
        const pivot = Math.ceil(maxNumberOfOptions / 2);
        const lastPageIndex = getLastPageIndex(totalNumberOfItems, pageSize);

        if (lastPageIndex <= maxNumberOfOptions) {

            while (options.length < lastPageIndex) options.push(options.length + 1);
        } else if (pageIndex < pivot) {

            while (options.length < maxNumberOfOptions) options.push(options.length + 1);
        } else if (pageIndex > (lastPageIndex - pivot)) {

            while (options.length < maxNumberOfOptions) options.unshift(lastPageIndex - options.length + 1);
        } else {

            for (var i = pageIndex - (pivot - 1); options.length < maxNumberOfOptions; i++) {
                options.push(i + 1);
            }
        }

        return options;

    }
    let popularPagination = document.querySelector('.popular .swiper-pagination');
    let slidesPagintation = document.querySelectorAll('.popular  .swiper-pagination-bullet');

    re();
    slidesPagintation.forEach(bullet => {
        let event = new Event("click");
        bullet.dispatchEvent(event);
        bullet.addEventListener(event, re)
    });
    window.addEventListener('click', event => {
        let e = event.target;
        if (!e.classList.contains('swiper-pagination-bullet')) return;
        e.addEventListener('click', re);
        slidesPagintation.forEach(el => el.classList.remove('active'));
        e.classList.add('active');
        console.log([...slidesPagintation].indexOf(document.querySelector('.swiper-pagination-bullet.active')));
        mySwiper.slideTo([...slidesPagintation].indexOf(document.querySelector('.swiper-pagination-bullet.active')));
    })
    mySwiper.on('slideChange', re);
    mySwiper.on('resize', re);
    function re() {
        document.querySelector('.popular .swiper-pagination').innerHTML = '';

        for (let i = 0; i < 5; i++) {
            document.querySelector('.popular .swiper-pagination').append(slidesPagintation[getPageIndexOptions(slidesPagintation.length, 5, 1, mySwiper.activeIndex)[i] - 1]);
        };

    }

    // end new code


}

if (document.querySelector('.announce-slider')) {
    let announceSlider = new Swiper('.announce-slider', {
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
}


//счетчик
//поля счетчика
let dayNode = document.querySelector('#day');
let hoursNode = document.querySelector('#hours');
let minutesNode = document.querySelector('#minutes');
let secondsNode = document.querySelector('#seconds');

// дата отложенной записи
let dateArr = "2021-08-06";
//время 
let endTime = "16:06:15";

// функция преобразования абсолютной даты 
function convertMS(milliseconds) {
    // let dayD, hourD, minuteD, secondsD;
    milliseconds = +milliseconds;
    var secondsD = Math.floor(milliseconds / 1000);
    var minuteD = Math.floor(secondsD / 60);
    secondsD = secondsD % 60;
    var hourD = Math.floor(minuteD / 60);
    minuteD = minuteD % 60;
    var dayD = Math.floor(hourD / 24);
    hourD = hourD % 24;

    // return {
    //     day: dayD.toString().length < 2 ? '0' + dayD : dayD,
    //     hour: hourD.toString().length < 2 ? '0' + hourD : hourD,
    //     minute: minuteD.toString().length < 2 ? '0' + minuteD : minuteD,
    //     seconds: secondsD.toString().length < 2 ? '0' + secondsD : secondsD
    // };
    function check(st) {
        if (st.toString().length < 2) {
            return '0' + st;
        } else return st;
    };

    return {
        day: check(dayD),
        hour: check(hourD),
        minute: check(minuteD),
        seconds: check(secondsD)
    };
};

if (dayNode) {
    let timerTo = setInterval(() => {

        let fullDate = `${dateArr} ${endTime}`;
        let dateT = new Date(fullDate);

        if (Number.isNaN(dateT.getMonth())) {
            let arr = fullDate.split(/[- :]/);
            dateT = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
        }

        // получаем разницу между датой отложенной записи и текущей в мс
        let objDate = convertMS(Date.parse(`${dateT}`) - new Date());

        dayNode.innerText = Object.keys(objDate).map(e => objDate[e])[0];
        hoursNode.innerText = Object.keys(objDate).map(e => objDate[e])[1];
        minutesNode.innerText = Object.keys(objDate).map(e => objDate[e])[2];
        secondsNode.innerText = Object.keys(objDate).map(e => objDate[e])[3];

        if (seconds.innerText < 0) {
            //отключаем таймер и сбрасываем счетчики при достижении заданного времени
            clearInterval(timerTo);
            dayNode.innerText = '00';
            hoursNode.innerText = '00';
            minutesNode.innerText = '00';
            secondsNode.innerText = '00';
        }
    }, 1000);

}
if (document.querySelector('.b-video')) {

    var resHeight = function () {
        let videoBlock = document.querySelector('.b-video');
        videoBlock.querySelector('.news-video__right')
            .style.minHeight = videoBlock.querySelector('.news-video')
                .offsetHeight + 'px';
    }
}
if (document.querySelector('.b-video')) {
    resHeight();

}
if (document.querySelector('.b-video')) {
    window.addEventListener('resize', () => {
        resHeight()
    });
}

// модуль календаря и проверка на наличие календаря на странице
if (document.querySelector(".table-calendar")) {

    if (document.querySelector('.dflex-spaceb .main .new-posts') && window.outerWidth <= 992) {
        document.querySelector('.dflex-spaceb .main .new-posts').style.paddingTop = '340px';
    }
    if (document.querySelector('.main .program') && window.outerWidth <= 992) {
        document.querySelector('.main .program').style.paddingTop = '340px';
    }
    if (document.querySelector('.dflex-spaceb .main .new-posts') && window.outerWidth <= 992) {
        document.querySelector('.dflex-spaceb .main .new-posts').style.paddingTop = '340px';
    }
    if (document.querySelector('.main .program') && window.outerWidth <= 360) {
        document.querySelector('.container .main .program').style.paddingTop = '262px';
    }
    if (document.querySelector('.dflex-spaceb .main .new-posts') && window.outerWidth <= 360) {
        document.querySelector('.dflex-spaceb .main .new-posts').style.paddingTop = '262px';
    }
    if (document.querySelector('.wrapper') && window.outerWidth <= 991 && window.outerWidth >= 750) {
        document.querySelector('.wrapper').style.top = '350px';
    }

    if (document.querySelector('.wrapper') && window.outerWidth <= 991) {
        if (document.querySelector('.news_today_btn')) {
            document.querySelector('.dflex-spaceb .main .new-posts').style.paddingTop = document.querySelector('.dflex-spaceb .main .new-posts').style.paddingTop.replace('px', '') * 1 + 70 + 'px'
        }
        function setTop() {
            let headerHeight = document.querySelectorAll('header')[0].offsetHeight;
            document.querySelector('.wrapper').style.top = headerHeight + 43 + 'px';
            window.addEventListener('scroll', () => {
                if (window.pageYOffset <= 1) {
                    setTimeout(() => {
                        document.querySelector('.wrapper').style.top = document.querySelectorAll('header')[0].offsetHeight + 43 + 'px';
                    }, 200)
                };
            });
        };
        setTop();
        window.addEventListener('scroll', setTop);
    };
    function setCalendar() {
        function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }
        let newDateString = formatDate(new Date());
        // start
        // проверка на совпадение даты текущей с той,которую выбрал пользователь
        let queryStringDate = location.search.replace('?query=', '');
        // проверка на совпадение дат заправшиваемой и текущей
        if (queryStringDate == newDateString || !/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/.test(queryStringDate)) {
            // если даты равны ,тогда дефолтные значения текущего дня
            var today = new Date();
            var currentMonth = today.getMonth();
            var currentYear = today.getFullYear();
        } else if (queryStringDate != newDateString) {
            // если не совпадают дни квери запроса и текущего,задаем значения квери запроса
            var today = new Date(queryStringDate);
            var currentMonth = Number(queryStringDate[5] + queryStringDate[6]) - 1;
            var currentYear = Number(queryStringDate[0] + queryStringDate[1] + queryStringDate[2] + queryStringDate[3]);
        }
        if (queryStringDate.length < 1) {
            // если квери запрос отсувствует,тогда дефолтные значения текущего дня
            var today = new Date();
            var currentMonth = today.getMonth();
            var currentYear = today.getFullYear();
        }

        let nowDate =
            (new Date().getFullYear()) +
            '-' +
            ((new Date().getMonth() + '').length < 2 ? '0' + (new Date().getMonth()) : new Date().getMonth()) +
            '-' +
            ((new Date().getDate() + '').length < 2 ? '0' + new Date().getDate() : new Date().getDate());

        function generate_year_range(start, end) {
            var years = "";
            for (var year = start; year <= end; year++) {
                years += "<option value='" + year + "'>" + year + "</option>";
            }
            return years;
        }
        // end

        let selectYear = document.getElementById("year");
        let selectMonth = document.getElementById("month");

        let createYear = generate_year_range(1970, 2050);

        document.getElementById("year").innerHTML = createYear;

        var calendar = document.getElementById("calendar");
        var lang = calendar.getAttribute('data-lang');

        var months = "";
        var days = "";

        // массивы текстовок по языкам,передаются через атрибут lang
        var monthDefault = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];

        var dayDefault = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

        var monthSecond = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

        var daySecond = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

        months = document.querySelector('html').lang == 'uk' ? monthDefault : monthSecond;
        days = document.querySelector('html').lang == 'uk' ? dayDefault : daySecond;

        var $dataHead = "<tr>";
        for (var dhead in days) {
            $dataHead += "<th data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
        }
        $dataHead += "</tr>";


        document.getElementById("thead-month").innerHTML = $dataHead;

        let monthAndYear = document.getElementById("monthAndYear");
        showCalendar(currentMonth, currentYear);

        function next() {
            currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
            currentMonth = (currentMonth + 1) % 12;
            showCalendar(currentMonth, currentYear);
        }

        function previous() {
            currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
            currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
            showCalendar(currentMonth, currentYear);
        }

        function jump() {
            currentYear = parseInt(selectYear.value);
            currentMonth = parseInt(selectMonth.value);
            showCalendar(currentMonth, currentYear);
        }

        function showCalendar(month, year) {
            var firstDay = new Date(year, month).getDay() === 0 ?
                new Date(year, month).getDay() + 6 :
                new Date(year, month).getDay() - 1;
            let tbl = document.getElementById("calendar-body");
            tbl.innerHTML = "";
            monthAndYear.innerHTML = months[month] + " " + year;
            selectYear.value = year;
            selectMonth.value = month;
            // создание сетки таблицы
            var date = 1;
            for (var i = 0; i < 6; i++) {

                var row = document.createElement("tr");
                for (var j = 0; j < 7; j++) {
                    if (i === 0 && j < firstDay) {
                        var cell = document.createElement("td");
                        var cellText = document.createTextNode("");
                        cell.appendChild(cellText);
                        row.appendChild(cell);
                    } else if (date > daysInMonth(month, year)) {
                        break;
                    } else {
                        cell = document.createElement("td");
                        cell.setAttribute("data-date", date);
                        cell.setAttribute("data-month", month + 1);
                        cell.setAttribute("data-year", year);
                        cell.setAttribute("data-month_name", months[month]);
                        cell.className = "date-picker";
                        cell.innerHTML = "<span>" + date + "</span>";

                        if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                            cell.className = "date-picker selected";
                        }
                        row.appendChild(cell);
                        date++;
                    }
                }
                tbl.appendChild(row);
            }
        }

        function daysInMonth(iMonth, iYear) {
            return 32 - new Date(iYear, iMonth, 32).getDate();
        }

        let calendarNext = document.querySelector('#next');
        let calendarPrev = document.querySelector('#previous');

        calendarNext.onclick = next;
        calendarPrev.onclick = previous;


        if (document.querySelector('.b-week')) {

            // проверка на высокосный год
            Number.prototype.isLeap = function () {
                return !(this % 4 || !(this % 100) && this % 400);
            }

            let calendarMonth = {
                1: 31,
                2: (+yearFromQueryString).isLeap() ? 28 : 29,
                3: 31,
                4: 30,
                5: 31,
                6: 30,
                7: 31,
                8: 31,
                9: 30,
                10: 31,
                11: 30,
                12: 31
            }

            let daysWeek = document.querySelectorAll('.b-week__item');
            let reg = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;
            if (!location.search.indexOf('?query=') && reg.test(location.search.replace('?query=', ''))) {
                var yearFromQueryString = queryStringDate.split('-')[0];
                var mounthFromQueryString = queryStringDate.split('-')[1].replace(/^0+/, '');
                var dayFromQueryString = queryStringDate.split('-')[2].replace(/^0+/, '');
                var dayWeek = new Date(yearFromQueryString, mounthFromQueryString - 1, dayFromQueryString).getDay() - 1;
            } else {
                var yearFromQueryString = new Date().getFullYear();
                var mounthFromQueryString = +(new Date().getMonth()) + 1;
                var dayFromQueryString = new Date().getDate();
                var dayWeek = new Date(yearFromQueryString, mounthFromQueryString - 1, dayFromQueryString).getDay() - 1;
            }

            daysWeek.forEach(elem => {
                elem.classList.remove('active');
            });
            daysWeek[0].classList.add('active');
            for (let c = 0; c < daysWeek.length; c++, dayWeek++) {
                if (dayWeek + 1 > 7) {
                    dayWeek = 0;

                }
                if (dayWeek < 0) {
                    dayWeek = 6;
                };

                daysWeek[c].innerHTML =
                    `${dayDefault[dayWeek]} / ${(+mounthFromQueryString)}.${dayFromQueryString++}`;

                // нормальное положение даты
                if (+dayFromQueryString <= +calendarMonth[+mounthFromQueryString]) {
                    // +(calendarMonth[+mounthFromQueryString] + 1) выбираем текущий месяц из обьета с количеоством 
                    // +дней в месяце,вставляем текущий месяц + 1,потому какотсчет с 0.приводим к числу
                    daysWeek[c].setAttribute('data-date', +dayFromQueryString - 1);
                    daysWeek[c].setAttribute('data-month', +mounthFromQueryString);
                    daysWeek[c].setAttribute('data-year', +yearFromQueryString);
                } else if (+dayFromQueryString > +calendarMonth[+mounthFromQueryString]) {
                    daysWeek[c].setAttribute('data-date', +dayFromQueryString - 1);
                    daysWeek[c].setAttribute('data-month', +mounthFromQueryString);
                    daysWeek[c].setAttribute('data-year', +yearFromQueryString);
                    dayFromQueryString = 1;
                    +mounthFromQueryString++;

                    if (+mounthFromQueryString > 12) {
                        yearFromQueryString++
                        mounthFromQueryString = 1;
                        dayFromQueryString = 1;
                        daysWeek[c].setAttribute('data-year', +yearFromQueryString);
                        daysWeek[c].setAttribute('data-month', 12);
                        daysWeek[c].setAttribute('data-date', 31);
                    }
                }
            }
        }
    }
    // запуск функции
    setCalendar();
}
window.addEventListener('click', function (e) {

    // проверка на нажатие на ячейку таблицы
    if (!e.target.closest('TD')) return;
    let thisDate = e.target.closest('TD');
    let thisDay = thisDate.getAttribute('data-date').length < 2 ? '0' + thisDate.getAttribute('data-date') : thisDate.getAttribute('data-date');;
    let thisMonth = thisDate.getAttribute('data-month').length < 2 ? '0' + thisDate.getAttribute('data-month') : thisDate.getAttribute('data-month');
    let thisYear = thisDate.getAttribute('data-year');

    let postDateString = `${thisYear}-${thisMonth}-${thisDay}`;

    location.href = '?query=' + postDateString;
});

window.addEventListener('click', (e) => {
    if (!e.target.classList.contains('b-week__item')) return;
    let elem = e.target;
    let weekDateString = `${elem.getAttribute('data-year')}-${(elem.getAttribute('data-month') + ''.toString()).length < 2 ? '0' + elem.getAttribute('data-month') : elem.getAttribute('data-month')}-${(elem.getAttribute('data-date') + ''.toString()).length < 2 ? '0' + elem.getAttribute('data-date') : elem.getAttribute('data-date')}`
    location.href = '?query=' + weekDateString;
})


// галеррея фанси бокс
if (document.querySelector('[data-fancybox="gallery"]')) {
    let fancyData = document.querySelectorAll('[data-fancybox="gallery"]');

    Fancybox.bind('[data-fancybox="gallery"]', {
        dragToClose: false,
        closeButton: "top",
        zoom: false,
        on: {
            initCarousel: (fancybox) => {
                const slide = fancybox.Carousel.slides[fancybox.Carousel.page];
                fancybox.$container.style.setProperty(
                    "--bg-image",
                    `url("${slide.$thumb.src}")`
                );
            },
            "Carousel.change": (fancybox, carousel, to, from) => {
                const slide = carousel.slides[to];
                fancybox.$container.style.setProperty(
                    "--bg-image",
                    `url("${slide.$thumb.src}")`
                );
            },
        },
    });

}

if (document.querySelector('.swiper-paging')) {
    const paging = new Swiper('.swiper-paging', {
        allowTouchMove: false,
        pagination: {
            el: '.paging',
            clickable: true,
            bulletActiveClass: 'active',
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + ++index + '</span>';
            },
        },
        navigation: {
            nextEl: '.paging-next',
            prevEl: '.paging-prev',
        },
    });
}

// функция определения отступа текущего элемента в контенеру
function sumElementsHeight(nodeElements, maxElement) {
    let heightOfItems = 0;
    for (let i = 0; i < maxElement; i++) {
        heightOfItems += nodeElements[i].offsetHeight;
    }
    // выходное значение - сумма высоты всеэ элементов на указанное количество,индекс
    return heightOfItems;
};

// сбрасываем активный класс на якорных элементах
function resetActiveClass(elements, activeClass = 'active') {
    elements.forEach(el => el.classList.remove(activeClass));
}
function indexOfNodeElems(collections, activeClass = '.expert.active') {
    return [...document.querySelectorAll(collections)].indexOf(document.querySelector(activeClass)) + 1;
}
//experts paging
// проверка на наличие модуля на странице
if (document.querySelector('.experts__link')) {
    let expertsLinks = document.querySelectorAll('.experts__link'),
        experts = document.querySelectorAll('.expert'),
        expertsContainer = document.querySelector('.experts__content');

    expertsLinks.forEach(link => {

        link.addEventListener('click', (e) => {
            // сбрасываем дефолтное поведение при событии
            e.preventDefault();
            // сбрасываем активный класс на якорных элементах
            resetActiveClass(experts);

            let activeAnchorElement = expertsContainer.querySelector(`#${link.hash.substr(1)}`);
            activeAnchorElement.classList.add('active');
            expertsLinks.forEach(el => el.classList.remove('active'));
            link.classList.add('active');

            function headerHeight() {
                return document.querySelectorAll('.header')[0].offsetHeight;
            }

            if (expertsContainer.offsetHeight - sumElementsHeight(experts, indexOfNodeElems('.expert')) >= activeAnchorElement.offsetHeight) {
                expertsContainer.scrollTo({
                    top: sumElementsHeight(experts, indexOfNodeElems('.expert')) - (activeAnchorElement.offsetHeight),
                    behavior: 'smooth'
                });
                window.scrollTo({
                    top: expertsContainer.offsetTop - headerHeight(),
                    behavior: 'smooth'
                });
            } else {
                expertsContainer.scrollTo({
                    top: sumElementsHeight(experts, indexOfNodeElems('.expert')) - (activeAnchorElement.offsetHeight),
                    behavior: 'smooth'
                });
                window.scrollTo({
                    top: expertsContainer.offsetTop - headerHeight(),
                    behavior: 'smooth'
                });
            }
        });
    });
}

// documents
if (document.querySelector('.documents')) {
    let selectMonth = document.querySelector('.select-month');
    let selectYear = document.querySelector('.select-year');

    if (window.location.search.replace('?query=', '').length < 1) {
        selectYear.querySelector(`[value="${new Date().getFullYear()}"]`).selected = true;
        selectMonth.querySelector(`[value="${(new Date().getMonth() + 1).toString().length < 2 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)}"]`).selected = true;
    } else {
        let qString = window.location.search.replace('?query=', '').split('-');

        document.querySelector("[value=" + "'" + qString[1] + "'" + "]").selected = true;
        document.querySelector("[value=" + "'" + qString[0] + "'" + "]").selected = true;

    }

    document.querySelector('.select-btn').addEventListener('click', () => {
        window.location.assign('' + '?query=' + selectYear.value + '-' + selectMonth.value + '-01');
    });
};
