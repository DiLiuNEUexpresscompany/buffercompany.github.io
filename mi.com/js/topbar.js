$(document).ready(function() {
	$('#topbar .cart-mini').hover(function(){
		$(this).addClass('cart-mini-active').parent().find('.cart-menu').animate({height:'96px'}, 200);
	},function(){
		$(this).addClass('cart-mini-active').parent().find('.cart-menu').animate({height:'96px'}, 200);
	})
	$('#topbar .cart-menu').hover(function(){
		$('#topbar .cart-mini').addClass('cart-mini-active');
		$(this).animate({height:'96px'}, 200);
	},function(){{
		$('#topbar .cart-mini').removeClass('cart-mini-active');
		$(this).animate({height:'0px'}, 200);
	}})
});