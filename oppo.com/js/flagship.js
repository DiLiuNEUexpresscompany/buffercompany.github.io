$(document).ready(function(){
    var scalePer = 1.025;
    var imgSize = [];
    $('.main-flagship .box').hover(function(){
        var img = $(this).find('.img');
        imgSize[0] = parseInt(img.css('width'));
        imgSize[1] = parseInt(img.css('height'));
        imgSize[2] = imgSize[0] * scalePer;
        imgSize[3] = imgSize[1] * scalePer;
        img.stop().animate({
            width: imgSize[2],
            height: imgSize[3]
        },200);
    },function(){
        var img = $(this).find('.img');
        img.stop().animate({
            width: imgSize[0],
            height: imgSize[1]
        },200)
    });
});
