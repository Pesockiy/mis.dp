
// все посты
let postsCount = 22;
// скока надо показывать постов в слайде
let slidesToShow = 7;
// количество слайдов на кол-во постов
let slides = posts > slidesToShow ?
    parseInt(postsCount / slidesToShow) + 1 :
    parseInt(postsCount / slidesToShow);

// массив обьектов json/
let posts = [
    { 'title': 'sdlkfndmskf', 'text': 'some text 1' },
    { 'title': 'sdlkfndmskf', 'text': 'some text 2' },
    { 'title': 'sdlkfndmskf', 'text': 'some text 3' }]

for (let i = 1; i <= slides; i++) {
    for (let c = 0; c < slidesToShow + 1; c++) {

        // тут мы будем рендерить дом 

        // здесь мы вычитаем у массива те слайды,которые уже отрисовали
        posts.splice(0, slidesToShow)
    }
}


// let slideDom = document.createElement('div');
// slideDom.classList.add('swiper-slide');
// let slidePost = document.createElement('a');
// slidePost.classList.add('projects-block__item');
// slidePost.href = "#";
// let slideLeft = document.createElement('div');
// slideLeft.classList.add('projects-block__left');
// let slideImg = document.createElement('img');
// slideImg.src = '';
// slideImg.alt = '';
// let slideRight = document.createElement('div');
// slideRight.classList.add('projects-block__right');
// let slideRightTop = document.createElement('div');
// slideRightTop.classList.add('projects-block__right-t');
// let slideRightTtl = document.createElement('h4');
// slideRightTtl.classList.add('projects-block__ttl');
// let slideRightText = document.createElement('p');
// slideRightText.classList.add('projects-block__text');
// let slideRightSpan = document.createElement('span');
// slideRightSpan.classList.add('read-more');
// let slideRightSpan = document.createElement('div');
// slideRightSpan.className = "projects-block__right-b b-rubric__bottom";



//     <div class="projects-block__right-b b-rubric__bottom">
//         <span class="tag">ТОП Міста</span>
//         <div class="block-date">
//             <span class="block-date__date block-date__date--calendar">21
//                 марта,2021</span>
//             <span class="block-date__views">3</span>
//         </div>
//     </div>