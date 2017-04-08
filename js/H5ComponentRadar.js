/*雷达图组件对象*/
var H5ComponentRadar = function(cfg){
	var cfg = cfg || {};
	var component = new H5ComponentBase(cfg);

	//绘制网格线-背景层
	var w = cfg.width;
	var h = cfg.height;
	var step = cfg.data.length;

	//加入一个画布（背景层）
	var cns = $('<canvas></canvas>');//此时cns是jQuery对象
	var cns = cns[0];//将jQuery对象转换为DOM对象，.getContext方法是DOM方法
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;

	component.append(cns);
	var r = w / 2;
	var step = cfg.data.length;
	ctx.lineWidth = 1;
	ctx.strokeStyle =  "#aaa";
	// window.ctx = ctx;


	//绘制网格背景
	var changeColor = false;
	for (var s = 5; s > 0; s--){
		ctx.beginPath();
		for (var i = 0; i < step; i++) {
			var rad0 =  Math.PI / 2;
			var rad = ( 2 * Math.PI / 360 ) * ( 360 / step ) * i;
			var x = r + Math.sin( rad ) * r * s / 5;
			var y = r + Math.cos( rad ) * r * s / 5;
			ctx.lineTo(x,y);
		}
		ctx.closePath();
		ctx.fillStyle = (changeColor = !changeColor) ? '#99c0ff' : '#f1f9ff';//改变背景的填充颜色
		ctx.fill();
		ctx.stroke();
	}

	//绘制伞骨
	ctx.beginPath();
	for (var i =0; i < step; i++){
		var rad = ( 2 * Math.PI / 360 ) * ( 360 / step ) * i;
		var x = r + Math.sin( rad ) * r;
		var y = r + Math.cos( rad ) * r;
		ctx.moveTo(r,r);
		ctx.lineTo(x,y);

		//添加项目文字
		var text = $('<div class="text text-'+(i+1)+'">'+cfg.data[i][0]+'</div>');
		// text.css('left', x/2);
		// text.css('top', y/2);
		text.css('transition', 'all .5s '+i*.1+'s');
		if(x > w/2){
			text.css('left', Math.round(x/2+5));
		}else{
			text.css('right', Math.round((w-x)/2+5));
		}
		if(y > h/2){
			text.css('top', Math.round(y/2)+5);
		}else{
			text.css('bottom', Math.round((h-y)/2+5));
		}

		component.append( text );
	}
	ctx.strokeStyle = '#e0e0e0';
	ctx.stroke();

	//加入一个画布（数据层）
	var cns = $('<canvas></canvas>');//此时cns是jQuery对象
	var cns = cns[0];//将jQuery对象转换为DOM对象，.getContext方法是DOM方法
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;

	component.append( cns );
	var r = w / 2;
	var step = cfg.data.length;
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle =  "#f00";
	// window.ctx = ctx;

	//定义数据层绘图函数
	var drawRadar = function( per ){
		//添加项目文字动画
		if( per >= 1 ){
			$('.text').css('opacity', 1);
		}
		if( per <= 1 ){
			$('.text').css('opacity', 0);
		}

		ctx.clearRect(0,0,w,h);
		ctx.strokeStyle =  "#f00";
		ctx.fillStyle = '#ff7676';

		//绘制折线
		ctx.beginPath();
		for (var i =0; i < step; i++){
			var rad = ( 2 * Math.PI / 360 ) * ( 360 / step ) * i;
			var rate = cfg.data[i][1];
			var x = r + Math.sin( rad ) * r * rate * per;
			var y = r + Math.cos( rad ) * r * rate * per;
			ctx.lineTo(x,y);
			
		}
		ctx.closePath();
		ctx.fillStyle = 'rgba(255,118,118,0.7)';
		ctx.fill();
		ctx.stroke();

		//绘制数据点
		ctx.fillStyle = '#ff7676';
		ctx.beginPath();
		for (var i =0; i < step; i++){
			var rad = ( 2 * Math.PI / 360 ) * ( 360 / step ) * i;
			var rate = cfg.data[i][1];
			var x = r + Math.sin( rad ) * r * rate * per;
			var y = r + Math.cos( rad ) * r * rate * per;
			// ctx.moveTo(x,y);
			ctx.moveTo(x,y);
			ctx.arc(x,y,3,0,2 * Math.PI);			
			ctx.fill();
		}
		ctx.stroke();
	}


	// drawRadar( 1 );

	//数据伸展动画
	component.on('onLoad',function(){
		var s = 0;
		for (var i = 0; i < 100; i++) {
			setTimeout(function(){
				s += .01;
				drawRadar(s);
			}, i * 10 + 800)
		}
	})

	//数据退场动画
	component.on('onLeave',function(){
		var s = 1;
		//闭包写法
		for (var i = 0; i < 100; i++) {
			setTimeout(function(){
				s -= .01;
				drawRadar(s);
			}, i * 10)
		}
	})


	// drawRadar(.2);
	return component;
}