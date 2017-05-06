/*饼图组件对象*/
var H5ComponentPie = function(cfg){
	var cfg = cfg || {};
	var component = new H5ComponentBase(cfg);

	var colors = ['DarkTurquoise', 'ForestGreen', 'Crimson', 'gold', 'purple'];

	//绘制数据层
	var w = cfg.width;
	var h = cfg.height;
	var step = cfg.data.length;

	//加入一个画布-数据层
	var cns = $('<canvas></canvas>');//此时cns是jQuery对象
	cns.css('zIndex',1);
	var cns = cns[0];//将jQuery对象转换为DOM对象，.getContext方法是DOM方法
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;

	component.append( cns );
	var r = w / 2;
	var step = cfg.data.length;

	ctx.lineWidth = 0.01;
	ctx.strokeStyle =  "#f00";
	// window.ctx = ctx;


	ctx.clearRect(0,0,w,h);
	ctx.strokeStyle =  "#fff";
	// ctx.fillStyle = '#ff7676';

	//绘制饼图
	var sAngle = 1.5 * Math.PI;
	var eAngle = 0;

	for (var i =0; i < step; i++){
		var rate = cfg.data[i][1] * 2 * Math.PI;
		var eAngle = sAngle + rate;
		
		// console.log(Math.sin(sAngle))
		ctx.beginPath();
		ctx.moveTo(r,r);
		ctx.arc( r, r, r, sAngle, eAngle );
		ctx.fillStyle = cfg.data[i][2] || ( cfg.data[i][2] = colors.pop() );
		ctx.fill();
		ctx.stroke();
		sAngle = eAngle;
		// console.log('sAngle:'+sAngle/Math.PI*180+'',sAngle/Math.PI,'rate:'+rate/Math.PI+'')

		// 添加项目文字及百分比
		var text = $('<div class="text text-'+(i+1)+'">'+cfg.data[i][0]+'</div>');
		var per = $('<div class="per">'+cfg.data[i][1]*100+'%</div>');
		var x =r + r * Math.cos( sAngle - .5 * rate );
		var y =r + r * Math.sin( sAngle -  .5 * rate );
		text.append( per );
		component.append( text );

		text.css( {'zIndex': 999,'width':'150px'} );
		text.css('transition', 'all 0.5s '+i*.1+'s');// 项目文字动画
		if( x > w/2 ){
			text.css( 'left', x/2+5);
		}else{
			text.css( 'right', (w-x)/2+5);
		}
		if( y > h/2 ){
			text.css( 'top', y/2+5);
		}else{
			text.css( 'bottom', (h-y)/2+5);
		}
		if( cfg.data[i][2] ){
			text.css( 'color', cfg.data[i][2] );
			text.css( 'color', cfg.data[i][2] );
		}
	}


	// 添加蒙版层画布
	var cns = $('<canvas></canvas>');//此时cns是jQuery对象
	cns.css('zIndex',2);
	var cns = cns[0];//将jQuery对象转换为DOM对象，.getContext方法是DOM方法
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append( cns );
	var r = w / 2;

	//伸展动画
	var drawPie = function( per ){
		//添加项目文字动画
		if( per >= 1 ){
			$('.text').css('opacity', 1);
		}
		if( per <= 1 ){
			$('.text').css('opacity', 0);
		}

		// 绘制蒙版层
		ctx.clearRect(0,0,w,h);// 清空
		ctx.beginPath();
		ctx.lineWidth = 0.01;
		ctx.strokeStyle = '#eee';
		ctx.moveTo(r,r);
		if( per <= 0 ){
			ctx.arc(r,r,r,sAngle,sAngle+2*Math.PI);
			
		}else{
			ctx.arc(r,r,r,sAngle,sAngle+2*Math.PI*per,true);
		}
		ctx.fillStyle = '#eee';
		ctx.fill();
		ctx.stroke();
	}


	// drawPie( 1 );

	//数据伸展动画
	component.on('onLoad',function(){
		var s = 0;
		// console.log('trigger:onLoad')
		for (var i = 0; i < 100; i++) {
			setTimeout(function(){
				s += .01;
				drawPie(s);
			}, i * 10 + 1500)
		}
	})

	//数据退场动画
	component.on('onLeave',function(){
		var s = 1;
		// console.log('trigger:onLeave')
		//闭包写法
		for (var i = 0; i < 100; i++) {
			setTimeout(function(){
				s -= .01;
				drawPie(s);
			}, i * 10)
		}
	})

	return component;
}