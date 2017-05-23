$(document).ready(function () {
    /*!热点问题 使用小技巧 交互*/
    $('.faq-list .faq-item').click(function () {
        var icon = $(this).find('.iconfont');
        $(this).find('.faq-details').toggle();
        if (icon.attr('class').indexOf('icon-jian') >= 0) {
            icon.removeClass('icon-jian').addClass('icon-jia');
        } else{
            icon.addClass('icon-jian').removeClass('icon-jia');
        };
        //event.stopPropagation();
    });
    $('.faq-list .faq-item .faq-details').click(function(){
        return false;// 阻止faq-item子元素冒泡
    });
});
