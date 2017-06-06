$(document).ready(function(){
    $('.footer-info .follow > a').hover(function(){
        if($(this).find('img')){
            $(this).find('img').show();
        }
    },function(){
        if($(this).find('img')){
            $(this).find('img').hide();
        }
    });
});
