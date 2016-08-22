$(function() {
    loadSearchList();
    setInterval(checkLoading, 2000);
});


function checkLoading() {
    if ($('.search_loading').css('display') == 'block') {
        loadSearchList();
    }
}


/* 加载搜索列表 */
function loadSearchList() {
    $('.search_loading').css('display', 'block');

    $.get("Ajax/Search/SearchListAjax.php", {keyword: key_word, offset: offset, count: count}, function(result) {
        $(".search_panel").empty();
        var search_list = eval('(' + result + ')');

        if (search_list.length == 0) {
            $(".search_panel").append('无搜索结果');
        } else {

            for (var i = 0; i < search_list.length; i++) {
                var add_string = "<a href=\"news" + search_list[i]['id'] + ".html\">\n\
                        <div class=\"search_div\"><div><h3 class=\"search_title\">"
                        + search_list[i]['title'] +
                        "<\/h3><div class=\"search_time\"><time>"
                        + search_list[i]['pubdate'] +
                        "<\/time><\/div><\/div><\/div><\/a>";
                $(".search_panel").append(add_string);
            }
        }
        $('.search_loading').css('display', 'none');
    });
}

$('.search_button').click(function() {
    $(".search_panel").empty();
    count = 10;
    offset = 0;
    key_word = $('.search_input').val();
    loadSearchList();
});

$('.home_button').click(function() {
    window.location.href = 'http://m.ntjoy.com';
});

/* 滚动锁 */
var scroll_mutex = 0;
$(window).scroll(function() {

    if (($(window).height() + $(window).scrollTop()) >= $(document).height() && scroll_mutex == 0) {
        scroll_mutex = 1;
        $('.search_load_more').css('display', 'block');
        offset += count;
        $.get("Ajax/Search/SearchListAjax.php", {keyword: key_word, offset: offset, count: count}, function(result) {

            var search_list = eval('(' + result + ')');
            for (var i = 0; i < search_list.length; i++) {
                var add_string = "<a href=\"news" + search_list[i]['id'] + ".html\">\n\
                        <div class=\"search_div\"><div><h3 class=\"search_title\">"
                        + search_list[i]['title'] +
                        "<\/h3><div class=\"search_time\"><time>"
                        + search_list[i]['pubdate'] +
                        "<\/time><\/div><\/div><\/div><\/a>";
                $(".search_panel").append(add_string);
            }
            $('.search_load_more').css('display', 'none');
            scroll_mutex = 0;
        });
    }
});