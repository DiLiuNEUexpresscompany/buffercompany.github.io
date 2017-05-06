$(document).ready(function( ) {
	var full_list = $('#header #search .full_list_link');
	for(var i = 0; i < full_list.length; i++){
		$(full_list[i]).on('click', function(event){
			var src = $('iframe').attr('src');
			var href = this.href;
			if(href.indexOf(src)>=0){
				$('iframe').toggle();
			} else if($('iframe').css('display') == 'none'){
				$('iframe').toggle();
				$('iframe').attr('src', href);
			} else{
				$('iframe').attr('src', href);
			};
			event.preventDefault();
		});
	}
});