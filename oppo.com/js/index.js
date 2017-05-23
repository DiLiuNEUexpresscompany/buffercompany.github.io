$(document).ready(function () {


    var carouselBanner = $('.banner .owl-carousel');
    var carouselBannerSub = $('.banner-sub .owl-carousel');

    var btnMore = $('.main-header .bottom-area .more-btn');
    var userBtn = $('.main-header .bottom-area .user-btn');

    var globalBtn = $('.main-header .upper-area .lang-area .global');
    var menuLang = globalBtn.next();

    var bodyWidth = $('body').css('width');

    /*banner轮播 banner-sub*/
    carouselBanner.owlCarousel({
        nav: true,
        items: 1,
        loop: true,
        navSpeed: 800,
        autoplaySpeed: 800,
        autoplay: true,
        center: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true
    });
    carouselBannerSub.owlCarousel({
        nav: false,
        responsiveClass: true,
        mouseDrag: false,
        touchDrag: false,
        responsive: {
            0: {
                items: 1,
                margin: 5
            },
            750: {
                items: 3,
                margin: 5
            }
        }
    });

    globalBtn.click(function () {
        $(this).find('a').addClass('active');
        menuLang.toggle();
    });

    /*more-btn点击*/
    btnMore.click(function () {
        userBtn.parent().find('.user-menu').hide();// 点击moreBtn隐藏user-menu
        $(this).parent().find('.main-menu').toggle();
        $(this).toggleClass('more-btn-active').find('.line').toggle();
    });

    /*user-btn点击*/
    userBtn.click(function () {
        if (btnMore.attr('class').indexOf('more-btn-active') >= 0) {
            btnMore.parent().find('.main-menu').toggle();
            btnMore.toggleClass('more-btn-active').find('.line').toggle();
        }
        btnMore.parent().find('.main-menu').hide();// 点击userBtn隐藏main-menu
        $(this).parent().find('.user-menu').toggle();
    });

    /*resize隐藏所有菜单*/


    $('.lang-area .menu-lang').css('width', bodyWidth);
    $('.banner .owl-item').css('width',bodyWidth);

    $(window).resize(function () {
        var bodyWidth = $('body').css('width');
        $('.lang-area .menu-lang').css('width', bodyWidth);


        $('.banner .owl-item').css('width',bodyWidth);
    })

    /*navi-scroll*/
    var scrollBtns = $('.navi-scroll a');
    var scrollTopBtn = $('.navi-scroll .scroll-top-btn');
    scrollBtns.each(function () {
        $(this).hover(function () {
            $(this).find('span').show();
        }, function () {
            $(this).find('span').hide();
        });
    });
    scrollTopBtn.click(function () {
        $('body').animate({scrollTop: 0}, 200);
    })

    $(window).scroll(function () {
        var top = $(this).scrollTop();
        if (top > 200) {
            $('.navi-scroll').fadeIn();
        } else {
            $('.navi-scroll').fadeOut();
        }

        if (menuLang.css('display') != 'none') {
            menuLang.hide();
        }
    })

    $(document).click(function () {

    });
});
