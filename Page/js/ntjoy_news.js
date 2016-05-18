/**
 * Created by Zanuck on 2016/5/18.
 */

//初始化css
function cssInit() {
    $('#art_main_card_id img').addClass('news_img');
    $('#art_main_card_id p').addClass('art_t');
}

$(function () {
    cssInit();
});

$(window).scroll(function () {
    if ($(window).scrollTop() > 400) {
        $('#pageJumpBtn >a').css('display', 'block');
    } else {
        $('#pageJumpBtn >a').css('display', 'none');
    }
});

$('#goPageTop').click(function () {
    window.scrollTo(0, 0);
});