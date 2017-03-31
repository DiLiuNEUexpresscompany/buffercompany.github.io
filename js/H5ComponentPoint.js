/*基本图文组件对象*/
var H5ComponentPoint = function(cfg){

	// var cfg = cfg || {};
	// var id = ('h5_c' + Math.random()).replace('0.','_');
	// var cls = 'h5_component_name_' + cfg.name + ' h5_component_' + cfg.type;
	// cfg = $.extend(cfg, {type:'base'});//若未指定组件类型 则默认为基本组件
	// var component = $('<div id="'+id+'" class="h5_component '+cls+'">'+cfg.text+'</div>');
	// cfg.width && component.width(cfg.width/2);
	// cfg.height && component.height(cfg.height/2);
	// cfg.css && component.css(cfg.css);
	// cfg.bg && component.css('backgroundImage', cfg.bg);
	// if (cfg.center == true) {
	// 	component.css({
	// 		position:'absolute',
	// 		marginLeft:(cfg.width/4 * -1) + 'px',
	// 		left:'50%',
	// 	});
	// }
	// component.on('onLoad', function() {
	// 	component.addClass('h5_component_' + cfg.type + '_load').removeClass('h5_component_' + cfg.type + '_leave');
	// 	cfg.animateIn && component.animate(cfg.animateIn);
	// });
	// component.on('onLeave', function() {
	// 	component.addClass('h5_component_' + cfg.type + '_leave').removeClass('h5_component_' + cfg.type + '_load');
	// 	cfg.animateOut && component.animate(cfg.animateOut);
	// });
	// $.each(cfg.data, function(index, item) {
	// 	console.log(item[0], item[1], item[2], item[3], item[4])
	// });

	var component = new H5ComponentBase( cfg );
	var base = cfg.data[0][1];
	//输出每个point
	$.each(cfg.data, function(index, item) {
		var point = $('<div class = "point point_'+(index + 1)+'"></div>');
		var name = $('<div class = "name">'+item[0]+'</div>');
		var rate = $('<div class = "rate">'+item[1]*100 + '%'+'</div> ')
		name.append( rate );
		point.append( name );
		component.append(point);
		var per = item[1] / base * 100 + '%';//各个point的大小百分比
		point.width( per ).height( per );
		//point颜色
		( item[2] != undefined ) && point.css({backgroundColor:item[2]});//此处必须使用 != underfined进行判断，因为item[3]的值若为0 使得条件永远为假
		//point位置
		( item[3] != undefined && item[4] != undefined ) && point.css({
			left:item[3],
			top:item[4],
		});
		console.log(item[0], item[1], item[2], item[3], item[4])
	});

	return component;
}