jQuery(function($) {'use strict'; 
	// Slider Height
	var slideHeight = $(window).height();
	$('#home-carousel .carousel-inner .item, #home-carousel .video-container').css('height',slideHeight);

	$(window).resize(function(){'use strict',
		$('#home-carousel .carousel-inner .item, #home-carousel .video-container').css('height',slideHeight);
	});

	// backstretch slide for main body
	// $.backstretch(["image.jpg"], {fade: 750,duration: 3000});

	// Feature Tab Content
	$('.features-nav li').on('click',function(){'use strict',
		$('.features-nav li').removeClass('active');
		$(this).addClass('active');
	});

	// responsive video
	$(".single-event").fitVids();
});