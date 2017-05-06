/*基本图文组件对象*/
var H5ComponentPoint = function(cfg){
	var component = new H5ComponentBase( cfg );
	var base = cfg.data[0][1];
	//输出每个point
	$.each(cfg.data, function(index, item) {
		var point = $('<div class = "point point-'+(index + 1)+'"></div>');
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
		// console.log(item[0], item[1], item[2], item[3], item[4])
	});

	return component;
}