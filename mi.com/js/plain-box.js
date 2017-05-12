$(document).ready(function() {
    $('.plain-box .topic .more .control-next').click(function() {
        $('.plain-box .carousel-list').css('marginLeft', '-1240px');
        $(this).addClass('control-disabled').siblings().removeClass('control-disabled');
        // console.log('next-----control-disabled');
    });
    $('.plain-box .topic .more .control-prev').click(function() {
        $('.plain-box .carousel-list').css('marginLeft', '0');
        $(this).addClass('control-disabled').siblings().removeClass('control-disabled');
        // console.log('prev-----control-disabled');
    });

    setInterval(carouselList, 5000);

    function carouselList() {
        var whichBtn = $('.plain-box .topic .more .control-prev').attr('class').indexOf('disabled') >= 0 ? 'next' : 'prev';
        $('.plain-box .topic .more .control-' + whichBtn + '').trigger('click');
    }

    /* 浮动动画 */
    $('.plain-box .brick-list .brick-item').hover(function() {
        $(this).addClass('brick-item-active').find('.comment').addClass('comment-active');
    }, function() {
        $(this).removeClass('brick-item-active').find('.comment').removeClass('comment-active');
    })

    /* more列表hover */
    var tabList = $('.plain-box .more .tab-list');
    var tabListLi = tabList.find('li');
    var span978 = $('.span978');
    var dataTarget = [];

    tabList.each(function(index, element) {
        dataTarget[index] = '#' + $(element).attr('data-target');
        $(this).find('li').hover(function() {
        	var targetId = '#' + $(this).parent().attr('data-target');
        	var i = $(this).index();
        	var brickList = $(''+targetId+' .span978 .brick-list');
        	$(this).addClass('active').siblings().removeClass('active');
            $(brickList[i]).css('display','block').siblings().css('display','none');
        });
    });

    /* 内容content */
    var brickList = $('#content .brick-list');
    var brickListLi = $('#content .brick-list .brick-item');

    
    var color = 
    // 控制按钮显示隐藏
    brickListLi.hover(function() {
    	$(this).find('.control').css('opacity','1');
    }, function() {
    	$(this).find('.control').css('opacity','0');
    });
    // 圆点左右箭头
    brickListLi.each(function(index,element){
    	var dotList = $(element).find('.dotBtn ul li span');
    	var contentScroll = $(element).find('.content-scroll');
    	// 改变title颜色
    	var color = $(element).css('borderTopColor');
    	$(element).find('.title').css('color',''+color+'');
    	$(element).find('.content-scroll .btn').css({'color':''+color+'','borderColor':''+color+''});
    	$(element).find('.content-scroll .btn').hover(function(){
    		$(this).css({'backgroundColor':''+color+'','color':'#fff'})
    	},function(){
    		$(this).css({'backgroundColor':'#fff','color':''+color+''})
    	});
    	// 左右移动动画
    	dotList.click(function(){
    		var marginLeft = $(this).parent().index() * -298;
    		$(this).addClass('active').parent().siblings().find('span').removeClass('active');
    		contentScroll.css('marginLeft',''+marginLeft+'px');
    	});

    	$(element).find('.controls .control-next').click(function(){
    		var marginLeft = parseInt(contentScroll.css('marginLeft'));
    		var dotNum = $(element).find('.content-scroll li').length;
    		var maxMarginLeft = (-298) * (dotNum - 1);
    		var marginLeftNew = marginLeft <= maxMarginLeft ? 0 : marginLeft - 298;// 判断是否已到最后一个
    		var newIndex = 0;
    		contentScroll.css('marginLeft',''+marginLeftNew+'px');

    		var currentIndex = $(element).find('.dotBtn li .active').parent().index();
    		// console.log(dotNum);
    		// console.log(marginLeft);
    		var newIndex = marginLeft <= maxMarginLeft ? 0 : currentIndex + 1;// 判断是否已到最后一个
    		changeDotStyle($(element), newIndex);
    		// console.log('dotNum',dotNum);
    		// console.log('old',currentIndex);
    		// console.log('new',newIndex);
    		// $($(element).find('.dotBtn li')[newIndex]).find('span').addClass('active').parent().siblings().find('span').removeClass('active');
    	});
    	$(element).find('.controls .control-prev').click(function(){
    		var marginLeft = parseInt(contentScroll.css('marginLeft'));
    		var dotNum = $(element).find('.content-scroll li').length;
    		var maxMarginLeft = (-298) * (dotNum - 1);
    		var marginLeftNew = marginLeft >= 0 ? maxMarginLeft : marginLeft + 298;// 判断是否是第一个
    		var newIndex = 0;
    		contentScroll.css('marginLeft',''+marginLeftNew+'px');

    		var currentIndex = $(element).find('.dotBtn li .active').parent().index();
    		var newIndex = marginLeft >= 0 ? dotNum - 1 : currentIndex - 1;// 判断是否是第一个
    		// console.log(dotNum);
    		changeDotStyle($(element), newIndex);
    		// $($(element).find('.dotBtn li')[newIndex]).find('span').addClass('active').parent().siblings().find('span').removeClass('active');
    	});
    });

    function changeDotStyle(targetEle, index){
    	$(targetEle.find('.dotBtn li')[index]).find('span').addClass('active').parent().siblings().find('span').removeClass('active');
    }
    // $($(element).find('.dotBtn li')[newIndex]).find('span').addClass('active').parent().siblings().find('span').removeClass('active');
    

    // 查看全部
    $('.more-link').hover(function(){
    	$(this).find('i').css('background','#ff6700');
    },function(){
    	$(this).find('i').css('background','#b0b0b0');
    });

    // video-play
    $('#video .brick-item').hover(function(){
        $(this).find('.play').addClass('play-active');
    },function(){
        $(this).find('.play').removeClass('play-active');
    })
});
