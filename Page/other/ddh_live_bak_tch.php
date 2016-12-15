<?php
//header('Location:http://m.ntjoy.com/404.html');

require_once __DIR__ . '/../../PHP/autoload.php';

use Model\Other\Ddh\DdhForm;
use Model\Other\Ddh\DdhChat;

if (isset($_GET['cid'])) {
    $cid = $_GET['cid'];
} else {
    $cid = 1;
}

/**
 * 频道播放地址
 */
if ($cid == 1) {
    //$video_url = "http://media.ntjoy.com/channels/nttv/live/m3u8:live"; //南通新闻综合频道
    $video_url = "http://media.ntjoy.com/channels/nttv/NEWS/m3u8:500k";
} elseif ($cid == 2) {
    $video_url = "http://media.ntjoy.com/channels/nttv/SOCIETY/m3u8:SD"; //南通都市生活频道
} elseif ($cid == 3) {
    $video_url = "http://media.ntjoy.com/channels/nttv/LIFE/m3u8:SD"; //南通影视频道
} elseif ($cid == 4) {
    $video_url = "http://media.ntjoy.com/channels/nttv/INFO/m3u8:SD"; //南通都市休闲频道
}

//$content_array = DdhForm::getContent(10);
$content_array = DdhForm::getContentByNtjoy(10);
$chat_array = DdhChat::getChatContent(300);
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no"/>
        <meta charset="UTF-8">
        <title>【正在直播】2016南通大众创业 万众创新 “通创荟”走进南通高校直播-江海明珠网</title>

        <!--加载css-->
        <link href="css/other/ddh_live.css" rel="stylesheet">
        <style></style>
    </head>
    <body>
        <div class="main_panel">
            <!--            <div>
                            <button class="chat_button" type="button" style="width:28%">
                                <a href="?cid=1"><font style="color:#ffffff"> 南通一套</font></a>
                            </button>
                            <button class="chat_button" type="button" style="width:28%">
                                <a href="?cid=2"><font style="color:#ffffff">南通二套</font></a>
                            </button>
                            <button class="chat_button" type="button" style="width:28%">
                                <a href="?cid=3"> <font style="color:#ffffff">南通三套</font></a>
                            </button>
            
                        </div>-->

            <div>
                <img src="img/image/other/ddh/tch.jpg" style="width:100%;height: 100%">
            </div>

            <div style="padding:10px 10px 0px 10px">
                <div id="player"></div>
            </div>

            <div style="padding:10px 10px 0px 10px">
                <h2 style="margin-bottom: 10px">
                    <img src="/img/image/other/connectLive-img-016.png" style="width:40px">
                    在线互动
                </h2>
                <div class="autoScroll" id="auto_scroll_id">
                    <div>
                        <div class="chat_list" style="background-color:#129bf0">
                            <a class="chat_list_a_user" style="color:#ffffff;font-weight: 600">公告通知:</a>
                            <a style="color:#ffffff">此为网友互动区域，发送留言内容，等待审核通过即可显示</a>
                        </div>
                    </div>
                    <!--                    <div>
                                            <div class="chat_list" style="background-color:#f66296">
                                                <a class="chat_list_a_user" style="color:#ffffff;font-weight: 600">小编:</a>
                                                <a style="color:#ffffff">快來说两句话吧~</a>
                                            </div>
                                        </div>-->

                    <?php
                    for ($i = 0; $i < count($chat_array); $i++) {
                        ?>
                        <div>
                            <div class="chat_list">
                                <a class="chat_list_a_user">用户:</a><?= $chat_array[$i]['content'] ?>
                            </div>
                        </div>
                        <?php
                    }
                    ?>
                </div>
            </div>


            <!--聊天发送底部框-->
            <div class="bottom" align="center">
                <div>
                    <input class="chat_input" type="text" placeholder="请输入内容,审核通过即显示">
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
            CKobject.embed("http://media.ntjoy.com/ckplayer/ckplayer.swf", "player", "ckplayer_player", "100%", "95%", false, flashvars, video);
        </script>
        <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
        <script src="js/other/ddh_live.js?randomId=<?= time() ?>"></script>
    </body>

</html>