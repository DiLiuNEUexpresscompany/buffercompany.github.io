/*基本图文组件对象*/
var H5ComponentPolyline = function(cfg){
	var cfg = cfg || {};
	var component = new H5ComponentBase(cfg);

	//绘制网格线
	var w = cfg.width;
	var h = cfg.height;

	//加入一个画布（网格线背景）
	var cns = $('<canvas></canvas>');//此时cns是jQuery对象
	var cns = cns[0];//将jQuery对象转换为DOM对象，.getContext方法是DOM方法
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;

	//水平网格线 10份
	var step = 10;
	ctx.beginPath();
	ctx.lineWidth = 5;
	ctx.strokeStyle =  "#aaa";

	window.ctx = ctx;
	for (var i = 0; i < step + 2; i++) {
		var y = (h/step)*i;
		ctx.moveTo(0,y);
		ctx.lineTo(w,y);
	}

	//垂直网格线（根据项目数量划分）
	step = cfg.data.length;
	for (var i = 0; i < step + 2; i++) {
		var x = ctx.width/(step+1) * i;
		ctx.moveTo(x,h);
		ctx.lineTo(x,0);
		if ( cfg.data[i] ){
			var text = $('<div class = "text"></div>')
			text.text(cfg.data[i][0]);
			text.css({
				width:Math.round(w / ( step + 1 ) * .5),
				left:Math.round(w / ( step + 1 ) * .5 * ( i + 1 )),
				marginLeft:Math.round(-w / ( step + 1 ) * .25),
				top:Math.round(h * .5 + 20),
			});
			component.append( text );
		}
		
	}
	ctx.stroke();
	component.append( cns );

	//新建画图-数据层
	var cns = $('<canvas></canvas>');
	var cns = cns[0];
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;

	/**
	 * 绘制折线以及对应的数据以及阴影
	 * @param  {[floot]} per [0到1之间的数据，函数会根据此致绘制折线图数据部分的中间状态]
	 * @return {[DOM]}     [component元素]
	 */
	function drawPolyline( per ) {
		//清空画布
		ctx.clearRect(0,0,w,h);

		//绘制折线数据
		ctx.beginPath();
		ctx.lineWidth = 10;
		ctx.strokeStyle = '#ff8878';

		//画点
		for (var i = 0; i < step; i++) {
			var item = cfg.data[i];
			var x = w/(step + 1) * (i + 1);
			var y = h * (1 - item[1]*per);
			ctx.moveTo(x,y);//如果不先moveTo(x,y)会导致直接将点连成线？？？
			ctx.arc(x,y,5,0,2*Math.PI);
			ctx.fillStyle = item[2] ? item[2] : '#333';//数据颜色
			ctx.font = "50px Verdana";
			ctx.fillText(Math.round(item[1] * 100) + '%', x - 10, y - 25);//写数据
		}

		//连线
		ctx.moveTo(w/(step + 1), h * (1 - cfg.data[0][1]*per));//移动画笔到第一个点
		// ctx.arc(w/(step + 1), h * (1 - cfg.data[0][1]),10,0,2*Math.PI);
		for (var i = 0; i < step; i++) {
			var item = cfg.data[i];
			var x = w/(step + 1) * (i + 1);
			var y = h * (1 - item[1]*per);
			ctx.lineTo(x,y);
		}
		ctx.stroke();//此处必须ctx.stroke()，否则下面瞎改ctx.trokeStyle将影响上面的设置

		//绘制阴影
		ctx.strokeStyle = 'rgba(255,255,255,0)';//影藏阴影的边框线
		ctx.lineTo(x,h);
		ctx.lineTo(w/(step + 1),h);
		ctx.fillStyle = 'rgba(255,118,118,0.3)';
		ctx.fill();
		ctx.stroke();

		component.append( cns );
	}
	//数据伸展动画
	component.on('onLoad',function(){
		var s = 0;
		//闭包写法
		for (var i = 0; i < 100; i++) {
			setTimeout(function(){
				s += .01;
				drawPolyline(s);
			}, i * 10 + 2000)
		}
	})

	//数据退场动画
	component.on('onLeave',function(){
		var s = 1;
		//闭包写法
		for (var i = 0; i < 100; i++) {
			setTimeout(function(){
				s -= .01;
				drawPolyline(s);
			}, i * 10)
		}
	})


	// drawPolyline(.2);
	return component;
}