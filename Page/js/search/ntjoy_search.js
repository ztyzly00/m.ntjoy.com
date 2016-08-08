$(function() {

});

$('.search_button').click(function() {
    var key_word = $('.search_input').val();
    window.location.href = 'search.php?keyword=' + key_word;
});

$('.home_button').click(function() {
    window.location.href = 'http://m.ntjoy.com';
});


$(window).scroll(function() {
    //到底加载
    if (($(window).height() + $(window).scrollTop()) >= $(document).height()) {
        $('.search_load_more').css('display', 'block');
        offset += 10;
        $.get("Ajax/Search/SearchListAjax.php", {keyword: key_word, offset: offset, count: count}, function(result) {

            var search_list = eval('(' + result + ')');
            for (var i = 0; i < search_list.length; i++) {
                var add_string = "<a href=\"news" + search_list[i]['id'] + ".html\"><div class=\"search_div\"><div class=\"j_art_lazy\"><img class=\"search_img\"                                 src=\"" + search_list[i]['small_thumbfile_url'] + "\"                                 style=\"display: block;\"><\/div><div><h3 class=\"search_title\">" + search_list[i]['title'] + "<\/h3><div class=\"search_time\"><time>" + search_list[i]['pubdate'] + "<\/time><\/div><\/div><\/div><\/a>";
                $(".search_panel").append(add_string);
            }
            $('.search_load_more').css('display', 'none');
        });
    }
});