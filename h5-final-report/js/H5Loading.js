/* 载入动画 */
/* 未载入时候隐藏page各个元素原理：载入未完成时，不触发h5.loader()方法，从而fullpage的onLoad onLeave事件没有触发，各个component应用初始样式，animateIn animateOut动画没有执行；component默认样式都设置为opacity: 0，则默认不显示，执行 h5.loader()方法后，调用fullpage的onLoad onLeave事件，从而调用animateIn animateOut执行动画，调整opacity position等，显示component*/
/* 通过所有图片是否加载完成来判断页面内容是否加载完成，并将图片加载完成的百分比加载到loading动画中 */
var H5Loading = function( images, index ){
	var id = this.id;
	window[id] = this;// 将当前H5对象-this（即H5.js创建的对象-h5）保存在全局变量中，以便在H5Loading函数中调用h5的loader方法
	
	// 第一次进入
	if( this.images === undefined ){// 当前this指的是实例化的H5-h5
		this.images = ( images || [] ).length;// 将第一次传入的images的length保存在h5对象的images中，第二次及以后触发loader不需要传入images参数，另外index是可选参数
		this.loaded = 0;
		
		for( i=0; i< this.images; i++ ){
			var item = images[i];
			var img = new Image;
			img.onload = function(){// 第i张图片载入成功，会触发loader事件，从而再次进入H5Loading -->this.load++ -->百分比增加
				window[id].loader();// 第二次及以后由此出进入H5Loading
//				$('#'+id).loader();// 此方法调用loader方法效果同window[id].loader() 测试不成功？？？
				
			}
			img.src = item;
		}
		$('.loading .rate').text('0%');
		return this;
	}else{
		// 第二次及以后进入
		this.loaded++;
		$('.loading .rate').text( Math.round( this.loaded / this.images * 100 ) + '%' );// 上面img的回调函数是百分比增加的关键
		if( this.loaded < this.images ){
			return this;
		}
	}
	
	// 当images中所有图片加载完成后之后 -->清除window的全局变量 -->执行fullpage的一系列方法  -->展示页面内容
	window[id] = null;
	
	this.el.fullpage({
			onLeave: function(index, nextIndex, direction) {
				$(this).find('.h5_component').trigger('onLeave'); //出发h5_component下面的onLeave事件
				//此处this指向page
			},
			afterLoad: function(anchorLink, index) {
				$(this).find('.h5_component').trigger('onLoad');
			}
		}); //给包含所有页的dom-this.el添加.fullpage方法、结合section类，实现全屏滚动

		// console.log(this.currentPage[0].find('.h5_component'))
		this.page[0].find('.h5_component').trigger('onLoad');
		this.el.show();
		if(index) {
			$.fn.fullpage.moveTo(index); // 页面载入指定页面
		}
		return this;
}
