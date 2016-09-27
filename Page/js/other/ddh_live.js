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
    loadWeiXinJs();
});

function cssInit() {
    /* 聊天框的高度正好匹配屏幕 */
    var PLAYER_HEIGHT = $('#player').css('height');
    PLAYER_HEIGHT = PLAYER_HEIGHT.substring(0, PLAYER_HEIGHT.length - 2);
    var CHATLIST_HEIGHT = PHONE_HEIGHT - (180 + parseInt(PLAYER_HEIGHT));
    $('.autoScroll').css('height', CHATLIST_HEIGHT + 'px');
    $('.autoScroll').css('height', '130px');
    /* 频道颜色匹配 */
    $('#channel_' + cid).attr('class', 'channel_list_a active');
    var boxId = "auto_scroll_id";
    var boxElement = document.getElementById(boxId);
    boxElement.scrollTop = boxElement.scrollHeight - boxElement.clientHeight;
}

/* Load WX module */
function loadWeiXinJs() {

    var cr_link = window.location.href;

    $.get("/Ajax/WeiXinAjax.php", {cr_link: cr_link}, function(result) {

        var Wx_attr_list = eval('(' + result + ')');

        wx.config({
            debug: false,
            appId: Wx_attr_list['appId'],
            timestamp: Wx_attr_list['timestamp'],
            nonceStr: Wx_attr_list['nonceStr'],
            signature: Wx_attr_list['signature'],
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo'
            ]

        });

        wx.ready(function() {
            wx.onMenuShareTimeline({
                title: '【正在直播】中国共产党南通市第十二次代表大会开幕--江海明珠网、掌上南通APP同步直播',
                link: '',
                imgUrl: 'http://m.ntjoy.com/img/image/other/ddh/ddh_logo.png',
                success: function() {

                },
                cancel: function() {

                }
            });
            wx.onMenuShareAppMessage({
                title: '【正在直播】中国共产党南通市第十二次代表大会开幕--江海明珠网、掌上南通APP同步直播',
                desc: '【正在直播】中国共产党南通市第十二次代表大会开幕--江海明珠网、掌上南通APP同步直播',
                link: '',
                imgUrl: 'http://m.ntjoy.com/img/image/other/ddh/ddh_logo.png',
                type: 'link',
                dataUrl: '',
                success: function() {

                },
                cancel: function() {

                }
            });

        });
    });
}

$('.chat_button').click(function() {
    var sd_msg = $('.chat_input').val();
    var send_string = '{"header":"message","content":{"classify":"ddh","data":"' + sd_msg + '"}}';
    //send_string = $.parseJSON(send_string);
    ws.send(send_string);
    $('.chat_input').val('');
});