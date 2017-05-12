$(document).ready(function(){
	var navItemList = $('.header-nav .nav-item');
	var unselected = $('.header-nav .unselected');
	var navMenu = $('.nav-menu');
	var navMenuContainer = navMenu.find('.container');

	navItemList.hover(function(){
		navMenu.stop().animate({height: '230px'},200).show().find('.nav-list').eq($(this).index() - 1).show().siblings().hide();
		navMenuContainer.stop().animate({height: '230px'},200);
	},function(){
		navMenu.stop().animate({height: '230px'},200).show().find('.nav-list').eq($(this).index() - 1).show().siblings().hide();
		navMenuContainer.stop().animate({height: '230px'},200);
	});

	navMenuContainer.hover(function(){
		// navMenu.stop().animate({height: '230px'},200).show().find('.nav-list').eq($(this).index() - 1).show().siblings().hide();
		// navMenuContainer.stop().animate({height: '230px'},200);
	},function(){
		navMenu.stop().animate({height: '0px'},200).find('.nav-list').hide();
		navMenuContainer.stop().animate({height: '0px'},200);
		navMenu.hide();
	});

	unselected.hover(function(){
		navMenu.stop().animate({height: '0px'},200).find('.nav-list').hide();
		navMenuContainer.stop().animate({height: '0px'},200);
		navMenu.hide();
	});
});