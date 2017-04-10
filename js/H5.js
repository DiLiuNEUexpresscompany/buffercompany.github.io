/*内容管理对象*/
var H5 = function() {
	this.id = ('h5' + Math.random()).replace('0.', '_')
	this.el = $('<div id="' + this.id + '"></div>');
	this.page = [];
	$('body').append(this.el);

	/**
	 * 添加页
	 * @param {string} name 页的名称
	 * @param {string} text 页内文字描述-调试用
	 * @return {H5} H5对象，可以重复使用H5对象支持的方法
	 */
	this.addPage = function(name, text) {
		var page = $('<div class="section h5_page"></div>'); //要使用fullpage.js插件实现全屏滚动，每一页必须添加名为section的类
		if(name != undefined) {
			page.addClass('h5_page_' + name);
		}
		if(text != undefined) {
			page.text(text);
		}
		this.el.append(page);
		this.page.push(page); //将当前创建的页存储到H5对象的currentPage中，便于将组件添加到当前页，而非其他页
		// 插入footer
		if(typeof this.addFooter === 'function') {
			this.addFooter();
		}
		return this;
	}

	/**
	 * 向页中添加组件
	 * @param {object} cfg 组件对象的基本参数-包括组件名name
	 * @return {H5} H5对象，可以重复使用H5对象支持的方法
	 */
	this.addComponent = function(cfg) {
		var cfg = cfg || {};
		var page = this.page.slice(-1)[0]; //问题：此处currentPage是数组，需要将其元素赋值给page，否则导致page不是对象，不支持.append方法，出错！
		//.slice方法返回的是数组，同样取出元素赋值给page，否则出错！
		cfg = $.extend({ type: 'base' }, cfg); // $.extend若后者参数同前者，后者将覆盖前者，故此处将cfg放在后面，防止type值被覆盖
		var component;
		switch(cfg.type) {
			case 'base': //组件对象有多种，便于扩展组件对象类型
				component = new H5ComponentBase(cfg);
				break;
			case 'polyline':
				component = new H5ComponentPolyline(cfg);
				break;
			case 'pie':
				component = new H5ComponentPie(cfg);
				break;
			case 'bar':
				component = new H5ComponentBar(cfg);
				break;
			case 'radar':
				component = new H5ComponentRadar(cfg);
				break;
			case 'ring':
				component = new H5ComponentRing(cfg);
				break;
			case 'point':
				component = new H5ComponentPoint(cfg);
				break;

			default:
		}
		page.append(component);
		return this;
	}

	this.loader = function(index) {
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

	this.loader = (typeof H5Loading === 'function') ? H5Loading : this.loader;// H5Loading一定是一个函数 -->此处结果一定是this.loader=H5Loading -->上面this.el.fullpage 以及此句代码可以简写如下：
	// this.loader = H5Loading；
	return this;
}