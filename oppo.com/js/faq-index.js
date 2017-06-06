$(document).ready(function () {
    /*!获取json数据*/
    window.faqJson = {};
    $.getJSON('json/faq.json', function (data) {
        faqJson = data;
        console.dir(data);

        /*!页面初始化*/
        $('.content-class-list li:first-child a').trigger('click');
    });

    function loadHtml(faqClass) {
        // 获取产品相关部分json数据
        for (var i = 0; i < faqJson[0].length; i++) {
            if (faqJson[0][i].class == faqClass) {
                var problems = faqJson[0][i].problems;
                var html0 = '';
                var html = '';
                var htmlP0 = '';
                var htmlP = '';
                //console.dir('problems-length:' + problems.length);

                for (var j = 0; j < problems.length; j++) {
                    var agree = 0;
                    agree = problems[j].agree;
                    var title = problems[j].title;
                    htmlP0 = '';
                    htmlP = '';
                    for (var k = 0; k < problems[j].content.length; k++) {
                        var p = problems[j].content[k];
                        htmlP0 = '<p>' + p + '</p>';
                        htmlP += htmlP0;
                        //console.log('htmlP:' + htmlP);
                    }
                    html0 = '<li>'
                        + '<h4 class="problem-topic">'
                        + title
                        + '</h4>'
                        + '<div class="problem-details">'
                        + htmlP
                        + '</div><div class="agree"><a href="javascript:;"><span class="agree-icon"></span><span class="agree-num">'
                        + '(' + agree + ')'
                        + '</span></a></div></li>';
                    html += html0;
                }
            }
        }

        // 获取购买、服务相关部分json数据
        for (var i = 0; i < faqJson.length; i++) {
            if (faqJson[i].class && faqJson[i].class == faqClass) {
                var problems = faqJson[i].problems;
                var html0 = '';
                var html = '';
                var htmlP0 = '';
                var htmlP = '';

                for (var j = 0; j < problems.length; j++) {
                    var agree = 0;
                    agree = problems[j].agree;
                    var title = problems[j].title;
                    htmlP0 = '';
                    htmlP = '';
                    for (var k = 0; k < problems[j].content.length; k++) {
                        var p = problems[j].content[k];
                        htmlP0 = '<p>' + p + '</p>';
                        htmlP += htmlP0;
                        //console.log('htmlP:' + htmlP);
                    }
                    html0 = '<li>'
                        + '<h4 class="problem-topic">'
                        + title
                        + '</h4>'
                        + '<div class="problem-details">'
                        + htmlP
                        + '</div><div class="agree"><a href="javascript:;"><span class="agree-icon"></span><span class="agree-num">'
                        + '(' + agree + ')'
                        + '</span></a></div></li>';
                    html += html0;
                }
            }
        }

        // 更改页面显示内容
        $('.content-body-list').html(html);
    }

    function changeMenuHtml(faqMenuClass) {
        switch (faqMenuClass) {
            case '产品相关':
                $('.content-title').show();
                $('.content-class').show();
                loadHtml("桌面辅助");
                break;
            case '购买相关':
                // 隐藏content-title content-appclass
                $('.content-title').hide();
                $('.content-class').hide();
                loadHtml(faqMenuClass);
                //console.log(faqMenuClass);
                break;
            case '服务相关':
                // 隐藏content-title content-appclass
                $('.content-title').hide();
                $('.content-class').hide();
                loadHtml(faqMenuClass);
                //console.log(faqMenuClass);
                break;
            default:
                //console.log('error:' + faqClass);
                break;
        }
    }

    /*! 绑定点击事件*/
    $('.content-class-list li a').click(function () {
        var faqClass = $(this).find('p').text();
        console.log(faqClass);
        $(this).parent().addClass('active').siblings().removeClass('active');
        loadHtml(faqClass);
    });
    $('.menu-list li a').click(function () {
        var faqMenuClass = $(this).text();
        $(this).parent().addClass('active').siblings().removeClass('active');
        changeMenuHtml(faqMenuClass);
    });
});
