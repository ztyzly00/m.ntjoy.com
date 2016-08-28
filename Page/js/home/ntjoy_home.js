/**
 * Created by Zanuck on 2016/5/16.
 * 小镇
 */

//dom加载完毕执行
$(function() {
    initCss();
});

function initCss() {
    $('.j_slide_sum').html($('.swipe-wrap div').length);
}

//调用swipe.js插件
var slider =
        Swipe(document.getElementById('top_slide_wrap_id'), {
            auto: 3000,
            continuous: true,
            callback: function(pos) {
                $('#j_topSlide_index').html(pos + 1);
            }
        });

//触发事件


$('#j_toggle_nav').click(function() {
    //判断展开按钮状态
    //我不推荐通过赋值class的方法来,可以用数值循环
    if ($('#j_toggle_nav').attr('class') == 'toggle_btn_up') {
        $('#nav_ntjoy_list_id >a').each(function() {
            if ($(this).attr('class') == 'hide') {
                $(this).attr('class', 'zk');
            }
        });
        $('#j_toggle_nav').attr('class', 'toggle_btn_down');
    } else {
        $('#nav_ntjoy_list_id >a').each(function() {
            if ($(this).attr('class') == 'zk') {
                $(this).attr('class', 'hide');
            }
        });
        $('#j_toggle_nav').attr('class', 'toggle_btn_up');
    }

});

/* 滚动锁 */
var scroll_mutex = 0;
$(window).scroll(function() {
    if ($(window).scrollTop() > 400) {
        $('#j_toTop').css('display', 'block');
    } else {
        $('#j_toTop').css('display', 'none');
    }

    if (($(window).height() + $(window).scrollTop()) + 0 >= $(document).height() && scroll_mutex == 0) {
        scroll_mutex = 1;
        $('#load_more_id').css('display', 'block');
        $.get("Ajax/NewsListAjax.php", {columnid: columnid, offset: offset, count: count}, function(result) {
            var news_list = eval('(' + result + ')');
            for (var i = 0; i < news_list.length; i++) {
                var add_string = "<a href=\"news" + news_list[i]['id'] + ".html\"><dl class=\"f_card\"><dt class=\"f_card_dt\"><img src=\"" + news_list[i]['small_thumbfile_url'] + " \"><\/dt><dd class=\"f_card_dd\"><h3 class=\"f_card_h3 ellipsis\">" + news_list[i]['title'] + "<\/h3><p class=\"f_card_p\">" + news_list[i]['brief_cut'] + "<\/p><div class=\"f_card_icon\"><span class=\"comment\">0<em class=\"icon_comment\"><\/em><\/span><\/div><\/dd><\/dl><\/a>";
                $("#main_news").append(add_string);
            }
            $('#load_more_id').css('display', 'none');
            scroll_mutex = 0;
        });
        offset = offset + count;
    }
});

$('#j_toTop').click(function() {
    window.scrollTo(0, 0);
});

$('#j_search').click(function() {
    if ($('.ntjoy_search_menu').css('display') == 'none') {
        $('.ntjoy_search_menu').css('display', 'block');
    } else {
        $('.ntjoy_search_menu').css('display', 'none');
    }
});

$('#j_menu').click(function() {
    if ($('.head_tc_nav_new').css('display') == 'none') {
        $('.head_tc_nav_new').css('display', 'block');
    } else {
        $('.head_tc_nav_new').css('display', 'none');
    }
//    alert('ff');
});


$('.search_button').click(function() {
    var key_word = $('.search_input').val();
    window.location.href = 'search.php?keyword=' + key_word;
});

function debug(string) {
    $('#test').append(string);
    $('#test').append('<br/>');
}