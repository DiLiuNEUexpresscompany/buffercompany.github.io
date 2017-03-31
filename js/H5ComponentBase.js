/*基本图文组件对象*/
var H5ComponentBase = function(cfg){
	var cfg = cfg || {};
	var id = ('h5_c' + Math.random()).replace('0.','_');
	//将组件类型添加到样式标识
	var cls = 'h5_component_name_' + cfg.name + ' h5_component_' + cfg.type;
	var component = $('<div id="'+id+'" class="h5_component '+cls+'"></div>');
	cfg.text && component.text( cfg.text );
	// cfg.text && component.text(cfg.text);
	cfg.width && component.width(cfg.width/2);
	cfg.height && component.height(cfg.height/2);
	cfg.css && component.css(cfg.css);
	cfg.bg && component.css('backgroundImage','url('+cfg.bg+')');
	if(cfg.center === true){
		component.css({
			position: 'absolute',
			marginLeft: (cfg.width/4 * -1) + 'px',
			left: '50%'
		});
	};
	component.on('onLoad',function(){
		component.addClass('h5_component_'+cfg.type+'_load').removeClass('h5_component_'+cfg.type+'_leave');
		cfg.animateIn && component.animate(cfg.animateIn);
	});
	component.on('onLeave',function(){
		component.addClass('h5_component_'+cfg.type+'_leave').removeClass('h5_component_'+cfg.type+'_load');
		cfg.animateOut && component.animate(cfg.animateOut);
	});
	
	var isLeave = false;
	$('body').on('click',function(){
		$('.h5_component').trigger(isLeave ? 'onLeave' : 'onLoad');
		isLeave = !isLeave;
	});

	return component;
}