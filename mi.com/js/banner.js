$(document).ready(function() {
	/* 自定义函数 */
    function changePic(direction) {

    }

    function showPic(obj) {
        // obj.css('display', 'block').siblings().css('display', 'none');
        obj.fadeIn(500).siblings().hide();
        $(btnList[currentImg]).addClass('active').siblings().removeAttr('class');
    }

    function autoShowPic(){
    	currentImg = currentImg >= imgNum - 1 ? 0 : currentImg + 1;
    	showPic($(bannerImgList[currentImg]));
    	// console.log(currentImg);
    }

    /* 菜单栏动画 */
    var topic = $('#banner .topic');
    $('#banner .topic').hover(function() {
    	var ulSum = $(this).find('.children-list ul').length;
    	var ulWidth = ulSum * 280 + 2;
        $(this).find('.children-list').css({'display':'block','width':''+ulWidth+'px'});
    }, function() {
        $(this).find('.children-list').css('display', 'none');
    });

    /* 轮播动画 */
    var imgNum = $('#banner .banner-wrap-pic li').length;
    var currentImg = 0;// 当前显示的图片序号
    var btnList = $('#banner .banner-wrap .bBtn li');
    var bannerImgList = $('#banner .banner-wrap-pic li');
    var arrowLeft = $('#banner .arrowBtn-left');
    var arrowRight = $('#banner .arrowBtn-right');

    // 默认显示第一张图片
    $('#banner .banner-wrap-pic li:not(:first-child)').hide();

    // 底部控制按钮
    for (var i = 0; i < btnList.length; i++) {
        $(btnList[i]).attr('index', i);
        $(btnList[i]).on('click', function() {
            var index = $(this).attr('index');
            currentImg = index;
            showPic($(bannerImgList[index]));
            // console.log(currentImg);
        });
    }

    // 左右箭头
    arrowLeft.click(function(){
    	currentImg = currentImg <= 0 ? imgNum - 1 : currentImg - 1;
    	showPic($(bannerImgList[currentImg]));
    	// console.log(currentImg, imgNum);
    });
    arrowRight.click(function(){
    	currentImg = currentImg >= imgNum - 1 ? 0 : currentImg + 1;
    	showPic($(bannerImgList[currentImg]));
    	// console.log(currentImg, imgNum);
    });

    // 自动切换图片
    var interval = setInterval(autoShowPic, 5000);
    bannerImgList.hover(function() {
    	clearInterval(interval);
    }, function() {
    	interval = setInterval(autoShowPic, 5000);
    });



    // $('.topic .children-list')[0].style.display = 'block';
});
