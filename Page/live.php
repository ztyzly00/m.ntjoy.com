<?php
if (isset($_GET['cid'])) {
    $cid = $_GET['cid'];
} else {
    $cid = 1;
}


/**
 * 频道播放地址
 */
if ($cid == 1) {
    $video_url = "http://m2.ntjoy.com/channels/nttv/NEWS/m3u8:SD"; //南通新闻综合频道
} elseif ($cid == 2) {
    $video_url = "http://media.ntjoy.com/channels/nttv/SOCIETY/m3u8:SD"; //南通都市生活频道
} elseif ($cid == 3) {
    $video_url = "http://media.ntjoy.com/channels/nttv/LIFE/m3u8:SD"; //南通影视频道
} elseif ($cid == 4) {
    $video_url = "http://media.ntjoy.com/channels/nttv/INFO/m3u8:SD"; //南通都市休闲频道
}
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no"/>
        <meta charset="UTF-8">
        <title>江海明珠网-直播</title>

        <!--加载css-->
        <link href="css/live/ntjoy_live.css" rel="stylesheet">
        <style>


        </style>
    </head>
    <body>
        <div id="player"></div>


        <!--频道列表-->
        <div class="channel_list">

            <a id="channel_1" href="live.php?cid=1" class="channel_list_a">新闻综合</a>
            <a id="channel_2" href="live.php?cid=2" class="channel_list_a">教育频道</a>
            <a id="channel_3" href="live.php?cid=3" class="channel_list_a">公共频道</a>
            <a href="http://m.ntjoy.com" class="channel_list_a full_active">主页</a>


        </div>

        <!--聊天列表-->
        <div class="autoScroll" id="auto_scroll_id">
            <div>
                <div class="chat_list" style="background-color:#06a7e1">
                    <a class="chat_list_a_user" style="color:#ffffff;font-weight: 600">公告通知:</a>
                    <a style="color:#ffffff">哦~在这儿停顿，直播互动功能上线ing！:-)</a>

                </div>
            </div>
            <div>
                <div class="chat_list" style="background-color:#f66296">
                    <a class="chat_list_a_user" style="color:#ffffff;font-weight: 600">小编:</a>
                    <a style="color:#ffffff">快來说两句话吧~</a>
                </div>
            </div>



        </div>

        <!--聊天发送底部框-->
        <div class="bottom" align="center">
            <div>
                <input class="chat_input" type="text" placeholder="请输入内容">
                <button class="chat_button" type="button">
                    发送
                </button>
            </div>
        </div>

        <!--js引入-->
        <script>
            var cid =<?= $cid ?>;
        </script>
        <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
        <script type="text/javascript" src="js/ckplayer/ckplayer.min.js" charset="utf-8"></script>
        <script type="text/javascript">
            var flashvars = {
                f: "<?= $video_url ?>",
                c: 0,
                p: 1,
                l: "",
                r: "http://www.ntjoy.com/tiaozhuan15.html",
                t: 0,
                b: 1,
                my_url: encodeURIComponent(window.location.href)
            };
            var video = ["<?= $video_url ?>->video/m3u8"];
            CKobject.embed("http://media.ntjoy.com/ckplayer/ckplayer.swf", "player", "ckplayer_player", "100%", "110%", false, flashvars, video);
        </script>
        <script src="js/live/ntjoy_live.js"></script>

    </body>

</html>