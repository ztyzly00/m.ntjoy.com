/**
 * Created by Zanuck on 2016/5/16.
 * 小镇纯手写，励志当牛逼前端
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
            auto: 1000,
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
$(window).scroll(function() {
    if ($(window).scrollTop() > 400) {
        $('#j_toTop').css('display', 'block');
    } else {
        $('#j_toTop').css('display', 'none');
    }
});
$('#j_toTop').click(function() {
    window.scrollTo(0, 0);
});

function debug(string) {
    $('#test').append(string);
    $('#test').append('<br/>');
}