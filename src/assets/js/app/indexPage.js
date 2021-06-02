import Swiper from 'swiper';

const swiper = new Swiper('.swiper-container', {
	// Optional parameters
	loop: true,
  
	// If we need pagination
	pagination: {
	  el: '.swiper-pagination',
	},
  
	// Navigation arrows
	navigation: {
	  nextEl: '.swiper-button-next',
	  prevEl: '.swiper-button-prev',
	},
  
	// And if we need scrollbar
	scrollbar: {
	  el: '.swiper-scrollbar',
	},
  }); 


  let timeNode = document.querySelector('.date__time');
 
  let getCurrentTimeString = () => {
	 return new Date().toTimeString().replace(/ .*/, '');
  }

  setInterval(
	 () => timeNode.innerHTML = getCurrentTimeString(),
	 1000
  );
