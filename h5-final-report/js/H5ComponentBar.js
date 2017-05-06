/*柱图组件对象*/
var H5ComponentBar = function(cfg){
	var component = new H5ComponentBase( cfg );
	var base = cfg.data[0][1];//定义进度条长度的基数
	//输出每个bar
	$.each(cfg.data, function(index, item) {
		var row = $('<div class = "bar bar-'+(index + 1)+'"></div>');//整行
		var name = $('<div class = "name">'+item[0]+'</div>');//项目名
		var prcs = $('<div class = "prcs"></div> ');//进度（比例）
		var prcs_bg = $('<div class = "prcs-bg"></div>');//进度内层 * 便于后面制作伸展动画
		var rate = $('<div class = "rate">'+item[1]*100 + '%'+'</div> ');//百分比
		prcs.append( prcs_bg );
		row.append( name, prcs, rate );
		component.append( row );

		var per = 0.55 * item[1]/base * 100 + '%';//各个bar的百分比  *0.55==>保证某一个bar达到100%也使其能在component组件框内显示完全
		prcs.width( per );
		(item[2] != undefined) && prcs_bg.css({backgroundColor:''+item[2]+''});

	});
	return component;
}