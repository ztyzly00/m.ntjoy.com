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
        <link href="css/other/ddh_live.css" rel="stylesheet">
        <style></style>
    </head>
    <body>
        <div class="main_panel">
            <div>            
                <img src="img/image/other/ddh.jpg" width="100%">
            </div>
            <div style="padding:10px 10px 0px 10px">
                <div id="player"></div>
            </div>
            <!--聊天列表-->

            <!--    <marquee  scrollamount="6" direction="Right" class="scroll_mar">
                    <ul class="scroll_ul">
                        <li>这</li>
                        <li>这次党代</li>
                        <li>这次党代</li>
                        <li>这次党代</li>
                        <li>这次党代</li>
                    </ul>
                </marquee>-->

            <div style="padding:10px 10px 0px 10px">
                <h2 style="margin-bottom: 10px">
                    <img src="/img/image/other/connectLive-img-016.png">
                    在线聊天
                </h2>
                <div class="autoScroll" id="auto_scroll_id">
                    <div>
                        <div class="chat_list" style="background-color:#129bf0">
                            <a class="chat_list_a_user" style="color:#ffffff;font-weight: 600">公告通知:</a>
                            <a style="color:#ffffff">此为用户聊天区域，发送聊天内容，等待审核通过即可显示</a>
                        </div>
                    </div>
                    <div>
                        <div class="chat_list" style="background-color:#f66296">
                            <a class="chat_list_a_user" style="color:#ffffff;font-weight: 600">小编:</a>
                            <a style="color:#ffffff">快來说两句话吧~</a>
                        </div>
                    </div>
                </div>
            </div>
            <div style="padding:10px">
                <h2 style="margin-bottom: 10px"><img src="/img/image/other/icon-calendar.png">实时报道</h2>
                <div class="calendar js-same-height" data-related-selector=".js-left-video" tabindex="0" style="overflow: hidden; outline: none; ">

                    <div class="calendar-item">
                        <div class="calendar-item-title">
                            <p>
                                <img src="img/image/other/connectLive-img-013.jpg" class="timelist">
                                <span>8月31日</span>
                            </p>
                            <h4>主题演讲:塑造云时代，testtest开启智慧新商道testtest开启智慧新商道testtest开启智慧新商道testtest开启智慧新商道</h4>

                        </div>
                    </div>

                    <div class="calendar-item">
                        <div class="calendar-item-title"><p><img src="img/image/other/connectLive-img-013.jpg" class="timelist">
                                <span>9月1日</span>
                            </p>
                            <h4>主题演讲: 塑造云时代，成为数字化企业</h4>                    
                        </div>                
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
        <!--<script src="js/live/ntjoy_live.js"></script>-->
        <script src="js/other/ddh_live.js"></script>
    </body>

</html>