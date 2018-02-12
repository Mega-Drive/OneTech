/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Custom Dropdown
4. Init Page Menu
5. Init Deals Slider
6. Init Tabs
7. Init Multirow Slider
8. Init Popular Categories Slider
9. Init Banner 2 Slider


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var menuActive = false;
	var header = $('.header');

	setHeader();

	initCustomDropdown();
	initPageMenu();
	initDealsSlider();
	initTabs();
	initMultirowSlider();
	sliderZIndex();
	initPopularSlider();
	initBanner2Slider();

	$(window).on('resize', function()
	{
		setHeader();
		sliderZIndex();
	});

	/* 

	2. Set Header

	*/

	function setHeader()
	{
		//Pin main nav to the top of the page when it's reached

		// var controller = new ScrollMagic.Controller(
		// {
		// 	globalSceneOptions:
		// 	{
		// 		triggerHook: 'onLeave'
		// 	}
		// });

		// var pin = new ScrollMagic.Scene(
		// {
		// 	triggerElement: '.main_nav'
		// })
		// .setPin('.main_nav').addTo(controller);

		if(window.innerWidth > 991 && menuActive)
		{
			closeMenu();
		}
	}

	/* 

	3. Init Custom Dropdown

	*/

	function initCustomDropdown()
	{
		if($('.custom_dropdown_placeholder').length && $('.custom_list').length)
		{
			var placeholder = $('.custom_dropdown_placeholder');
			var list = $('.custom_list');
		}

		placeholder.on('click', function (ev)
		{
			if(list.hasClass('active'))
			{
				list.removeClass('active');
			}
			else
			{
				list.addClass('active');
			}

			$(document).one('click', function closeForm(e)
			{
				if($(e.target).hasClass('clc'))
				{
					$(document).one('click', closeForm);
				}
				else
				{
					list.removeClass('active');
				}
			});

		});

		$('.custom_list a').on('click', function (ev)
		{
			ev.preventDefault();
			var index = $(this).parent().index();

			placeholder.text( $(this).text() ).css('opacity', '1');

			if(list.hasClass('active'))
			{
				list.removeClass('active');
			}
			else
			{
				list.addClass('active');
			}
		});


		$('select').on('change', function (e)
		{
			placeholder.text(this.value);

			$(this).animate({width: placeholder.width() + 'px' });
		});
	}

	/* 

	4. Init Page Menu

	*/

	function initPageMenu()
	{
		if($('.page_menu').length && $('.page_menu_content').length)
		{
			var menu = $('.page_menu');
			var menuContent = $('.page_menu_content');
			var menuTrigger = $('.menu_trigger');

			//Open / close page menu
			menuTrigger.on('click', function()
			{
				if(!menuActive)
				{
					openMenu();
				}
				else
				{
					closeMenu();
				}
			});

			//Handle page menu
			if($('.page_menu_item').length)
			{
				var items = $('.page_menu_item');
				items.each(function()
				{
					var item = $(this);
					if(item.hasClass("has-children"))
					{
						item.on('click', function(evt)
						{
							evt.preventDefault();
							evt.stopPropagation();
							var subItem = item.find('> ul');
						    if(subItem.hasClass('active'))
						    {
						    	subItem.toggleClass('active');
								TweenMax.to(subItem, 0.3, {height:0});
						    }
						    else
						    {
						    	subItem.toggleClass('active');
						    	TweenMax.set(subItem, {height:"auto"});
								TweenMax.from(subItem, 0.3, {height:0});
						    }
						});
					}
				});
			}
		}
	}

	function openMenu()
	{
		var menu = $('.page_menu');
		var menuContent = $('.page_menu_content');
		TweenMax.set(menuContent, {height:"auto"});
		TweenMax.from(menuContent, 0.3, {height:0});
		menuActive = true;
	}

	function closeMenu()
	{
		var menu = $('.page_menu');
		var menuContent = $('.page_menu_content');
		TweenMax.to(menuContent, 0.3, {height:0});
		menuActive = false;
	}

	/* 

	5. Init Deals Slider

	*/

	function initDealsSlider()
	{
		if($('.deals_slider').length)
		{
			var dealsSlider = $('.deals_slider');
			dealsSlider.owlCarousel(
			{
				items:1,
				loop:false,
				navClass:['deals_slider_prev', 'deals_slider_next'],
				nav:false,
				dots:false,
				smartSpeed:1200,
				margin:30,
				autoplay:false,
				autoplayTimeout:5000
			});

			if($('.deals_slider_prev').length)
			{
				var prev = $('.deals_slider_prev');
				prev.on('click', function()
				{
					dealsSlider.trigger('prev.owl.carousel');
				});	
			}

			if($('.deals_slider_next').length)
			{
				var next = $('.deals_slider_next');
				next.on('click', function()
				{
					dealsSlider.trigger('next.owl.carousel');
				});	
			}
		}
	}

	/* 

	6. Init Tabs

	*/

	function initTabs()
	{
		if($('.tabs').length)
		{
			var tabs = $('.tabs');

			tabs.each(function()
			{
				var tabsItem = $(this);
				var tabsLine = tabsItem.find('.tabs_line span');
				var tabGroup = tabsItem.find('ul li');
				tabGroup.each(function()
				{
					var tab = $(this);
					tab.on('click', function()
					{
						if(!tab.hasClass('active'))
						{
							tabGroup.removeClass('active');
							tab.toggleClass('active');
							var tabXPos = tab.position().left;
							var tabWidth = tab.width();
							tabsLine.css({'left': tabXPos, 'width': tabWidth});
						}
					});
				});
			});
		}
	}

	/* 

	7. Init Multirow Slider

	*/

	function initMultirowSlider()
	{
		if($('.multirow_slider').length)
		{
			var multirowSliders = $('.multirow_slider');

			multirowSliders.each(function()
			{
				var multirowSlider = $(this);
				multirowSlider.slick(
				{
					rows:2,
					slidesToShow:4,
					slidesToScroll:4,
					infinite:false,
					arrows:false,
					dots:true,
					responsive:
					[
						{
							breakpoint:768, settings:
							{
								slidesToShow:3,
								slidesToScroll:3
							}
						},
						{
							breakpoint:575, settings:
							{
								slidesToShow:2,
								slidesToScroll:2,
								dots:false
							}
						},
						{
							breakpoint:480, settings:
							{
								rows:1,
								slidesToShow:1,
								slidesToScroll:1,
								dots:false
							}
						}
					]
				});

				$('.multirow_slider_item').on('mouseenter', function()
				{
					$('.slick-dots').css('visibility', "hidden");
				});
				$('.multirow_slider_item').on('mouseleave', function()
				{
					$('.slick-dots').css('visibility', "visible");
				});

				// Handle Favorites
				$('.product_fav').each(function()
				{
					var fav = $(this);
					fav.on('click', function()
					{
						fav.toggleClass('active');
					});
				});
			});	
		}
	}

	function sliderZIndex()
	{
		$('.product_item').each(function()
		{
			var item = $(this);
			item.on('mouseenter', function()
			{
				item.css('z-index', "10");
			});
			item.on('mouseleave', function()
			{
				setTimeout(function()
				{
					item.css('z-index', "auto");
				},200);
				
			});
		});
	}

	/* 

	8. Init Popular Categories Slider

	*/

	function initPopularSlider()
	{
		if($('.popular_categories_slider').length)
		{
			var popularSlider = $('.popular_categories_slider');

			popularSlider.owlCarousel(
			{
				loop:true,
				autoplay:false,
				nav:false,
				dots:false,
				responsive:
				{
					0:{items:1},
					575:{items:2},
					640:{items:3},
					768:{items:4},
					991:{items:5}
				}
			});

			if($('.popular_categories_prev').length)
			{
				var prev = $('.popular_categories_prev');
				prev.on('click', function()
				{
					popularSlider.trigger('prev.owl.carousel');
				});
			}

			if($('.popular_categories_next').length)
			{
				var next = $('.popular_categories_next');
				next.on('click', function()
				{
					popularSlider.trigger('next.owl.carousel');
				});
			}
		}
	}

	/* 

	9. Init Banner 2 Slider

	*/

	function initBanner2Slider()
	{
		if($('.banner_2_slider').length)
		{
			var banner2Slider = $('.banner_2_slider');
			banner2Slider.owlCarousel(
			{
				items:1,
				loop:true,
				nav:false,
				dots:true,
				dotsContainer: '.banner_2_dots',
				smartSpeed:1200
			});
		}
	}
});