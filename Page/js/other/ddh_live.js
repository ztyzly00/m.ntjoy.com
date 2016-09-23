/**
 * Created by Zanuck on 2016/5/16.
 * 小镇
 */

var PHONE_HEIGHT = window.screen.availHeight;

ws = new WebSocket("ws://xm.ntwifi.cn:10028");

ws.onopen = function() {
    var send_string = '{"header":"confirm","content":{"classify":"ddh"}}';
    ws.send(send_string);
};

ws.onmessage = function(e) {
    $('.scroll_ul').append("<li>这次党代会非常的好，大家多支持</li>");
    $('.autoScroll').append("<div><div class=\"chat_list\"><a class=\"chat_list_a_user\">用户:<\/a>" + e.data + "<\/div><\/div>");
    var boxId = "auto_scroll_id";
    var boxElement = document.getElementById(boxId);
    boxElement.scrollTop = boxElement.scrollHeight - boxElement.clientHeight;
};
ws.onclose = function(e) {
    var send_string = '{"header":"close","content":{"classify":"ddh"}}';
    ws.send(send_string);
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
    $('.autoScroll').css('height', '100px');
    /* 频道颜色匹配 */
    $('#channel_' + cid).attr('class', 'channel_list_a active');
}

$('.chat_button').click(function() {
    var sd_msg = $('.chat_input').val();
    var send_string = '{"header":"message","content":{"classify":"ddh","data":"' + sd_msg + '"}}';
    //send_string = $.parseJSON(send_string);
    ws.send(send_string);
    $('.chat_input').val('');
});