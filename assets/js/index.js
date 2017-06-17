jQuery(document).ready(function($) {
	var $worksList = $('.works-list li');
	var listNum = $worksList.length;
	for(var i = 0; i < listNum; i++){
		var $a = $worksList.eq(i).find('.img-wrapper a');
		var imgSrc = $a.attr('imgsrc');
		$a.css({
			'background': 'url('+imgSrc+')',
			'backgroundSize': 'cover',
			'backgroundRepeat': 'no-repeat',
			'backgroundPosition': 'center center'
		});
	}
});