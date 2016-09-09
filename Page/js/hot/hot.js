(function() {

    var myScroll;
    var _$roll = $('.roll-bar-in');

    /* 文档加载完毕执行 */
    $(function() {
        init();
        myScroll = new IScroll('.roll-bar',
                {
                    click: true,
                    scrollX: true,
                });
        _$roll.on('click', 'li', function() {
            var _index = $(this).index();
            $(this).addClass('on').siblings().removeClass('on');
            myScroll.scrollToElement(_$roll.find('li:nth-child(' + (_index + 1) + ')').get(0), null, true, true);
            reloadArticle($(this).attr('tid'));
        });

    });

    function init() {
        cssInit();
        $("img.lazy").lazyload();
    }

    function cssInit() {
        if (!window.hot_news) {
            $('.main_panel').append('无内容');
        }
        modifyContent();
    }

    function modifyContent() {
        $('.articles_con img').addClass('lazy');
    }

    function reloadArticle(date_string) {
        $('.main_panel').empty();
        $.get("Ajax/Hot/HotNewsAjax.php", {columnid: window.column_id, datestring: date_string}, function(result) {
            var hot_list = eval('(' + result + ')');
            window.hot_news = hot_list.length;
            if (hot_list.length == 0) {
                $('.main_panel').append('无内容');
            } else {
                appendContent(hot_list);
            }
        });
    }

    function appendContent(hot_list) {
        for (var i = 0; i < hot_list.length; i++) {
            var append_string = "<div class=\"hot_articles\"><div class=\"articles_img\" style=\"background-image:url('"
                    + hot_list[i]['common_img_url'] +
                    "')\"><div class=\"overlay\"><\/div><div class=\"articles_inner\"><div class=\"post-head\"><h1 class=\"title\">"
                    + hot_list[i]['title'] +
                    "<\/h1><\/div><div class=\"post-meta\"><div class=\"autor-meta\"><span class=\"post-time\">"
                    + hot_list[i]['pubdate'] +
                    "<\/span><span class=\"post-name\">"
                    + hot_list[i]['name'] +
                    "<\/span><span class=\"post-category\">江海明珠网<\/span><\/div><\/div><\/div><\/div><\/div><div class=\"articles_con\"><p>"
                    + hot_list[i]['content'] +
                    "<\/p><\/div><div class=\"bottom_link\"><a class=\"totop\">本文结束<\/a><\/div>";
            $('.main_panel').append(append_string);
            init();
        }
    }

    $('#h_nav_menu').click(function() {
        if ($('#topLevelNav').css('display') == 'none') {
            $('#topLevelNav').css('display', 'block');
            $('.ntjoy_menu').css('display', 'block');
        } else {
            $('#topLevelNav').css('display', 'none');
            $('.ntjoy_menu').css('display', 'none');
        }
    });
    
    /* search click start */
    $('.search_button').click(function() {
        var key_word = $('.search_input').val();
        window.location.href = 'search.php?keyword=' + key_word;
    });
}());

