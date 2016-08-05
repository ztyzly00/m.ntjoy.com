/**
 * Created by Zanuck on 2016/5/16.
 * 小镇
 */

var PHONE_HEIGHT = window.screen.availHeight;

ws = new WebSocket("ws://xm.ntwifi.cn:10028");

ws.onopen = function() {

};

ws.onmessage = function(e) {
    $('.autoScroll').append("<div><div class=\"chat_list\"><a class=\"chat_list_a_user\">匿名用户:<\/a>" + e.data + "<\/div><\/div>");
    var boxId = "auto_scroll_id";
    var boxElement = document.getElementById(boxId);
    boxElement.scrollTop = boxElement.scrollHeight - boxElement.clientHeight;
};

/* dom加载完执行 */
$(function() {
    cssInit();
});

function cssInit() {
    /* 聊天框的高度正好匹配屏幕 */
    var PLAYER_HEIGHT = $('#player').css('height');
    PLAYER_HEIGHT = PLAYER_HEIGHT.substring(0, PLAYER_HEIGHT.length - 2);
    var CHATLIST_HEIGHT = PHONE_HEIGHT - (180 + parseInt(PLAYER_HEIGHT));
    $('.autoScroll').css('height', CHATLIST_HEIGHT + 'px');

    /* 频道颜色匹配 */
    $('#channel_' + cid).attr('class', 'channel_list_a active');
}

$('.chat_button').click(function() {
    var sd_msg = $('.chat_input').val();
    ws.send(sd_msg);
    $('.chat_input').val('');
});