$(document).ready(function () {

	$('.slider-table').slick({
		slidesToShow: 1,
		slidesToScroll: 1
	});


	$('#headerIconMenu').on('click', function (e) {
		e.preventDefault();

		$(this).toggleClass('active');
		$('#headerNav').toggleClass('active');
	})

	$('.header-menu__link').on('click', function () {
		$('#headerNav, #headerIconMenu').removeClass('active');
	})



	//tooltip positioning
	$('.author__name').hover(function () {
		var thisTooltip = $(this).siblings('.tooltip-progress');
		var differenceTop = $(this)
			.closest('.table__row')
			.position()
			.top - (thisTooltip.height());

		thisTooltip.fadeToggle(100);
		if (differenceTop >= 50) {
			thisTooltip.addClass('top');
		} else thisTooltip.addClass('bottom');


	})
});
