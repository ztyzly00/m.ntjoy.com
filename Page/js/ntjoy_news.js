/**
 * Created by Zanuck on 2016/5/18.
 */

//浏览器的高度
var BROWSER_HEIGHT = document.documentElement.clientHeight;

//初始化css
function cssInit() {
    //若没有图片js会报一条错误，不过无所谓
    $('#art_main_card_id img').addClass('news_img');
    $('#art_main_card_id img').addClass('lazy');
    $('#art_main_card_id p').addClass('art_t');
}

$(function() {
    cssInit();
    $("img.lazy").lazyload();
});


/*事件列表*/
//滚动事件
$(window).scroll(function() {
    if ($(window).scrollTop() > 400) {
        $('#pageJumpBtn >a').css('display', 'block');
    } else {
        $('#pageJumpBtn >a').css('display', 'none');
    }
});

//回顶部按钮事件
$('#goPageTop').click(function() {
    window.scrollTo(0, 0);
});

//评论框弹出事件
$('#foot_cmt_id').click(function() {
    $('#main_body').css('display', 'none');
    $('#j_cmnt_pop').css('display', 'block');
    $('#j_blankBox').css('height', (BROWSER_HEIGHT - 200) + 'px');
    window.scrollTo(0, BROWSER_HEIGHT);
});

$('#j_cmnt_cancel').click(function() {
    $('#main_body').css('display', 'block');
    $('#j_cmnt_pop').css('display', 'none');
});
