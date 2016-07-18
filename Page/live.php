<?php
if (isset($_GET['cid'])) {
    $cid = $_GET['cid'];
} else {
    $cid = 1;
}


//if (!$cid) {
//    $cid = 1; //cid默认情况
//}

/**
 * 频道播放地址
 */
if ($cid == 1) {
    $video_url = "http://m2.ntjoy.com/channels/nttv/NEWS/m3u8:SD"; //南通新闻综合频道
} elseif ($cid == 2) {
    $video_url = "http://m2.ntjoy.com/channels/nttv/SOCIETY/m3u8:SD"; //南通都市生活频道
} elseif ($cid == 3) {
    $video_url = "http://m2.ntjoy.com/channels/nttv/LIFE/m3u8:SD"; //南通影视频道
} elseif ($cid == 4) {
    $video_url = "http://media.ntjoy.com/channels/nttv/INFO/m3u8:SD"; //南通都市休闲频道
}
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no"/>
        <meta charset="UTF-8">
        <title>江海明珠网</title>

        <!--加载css-->
        <link href="css/ntjoy_home.css" rel="stylesheet">
    </head>
    <body>

        <!--江海明珠网头部-->
        <header class="ntjoy_header">
            <div align="center" style="color: #ffffff">
                <!--<img src="img/ntjoy_logo.png">-->
                <ul class="h_nav" style="float: left;">
                    <li class="h_nav_li" id="h_nav_li_login">
                        <a href="#" id="loginBox" style="color: white"><span
                                class=" h_nav_t icon_user" style="line-height: 40px">个人中心</span></a>
                    </li>
                </ul>
                <a style="color:white;font-size:24px;line-height: 40px">江海明珠网</a>
                <ul class="h_nav">
                    <li class="h_nav_li" id="j_menu">
                        <a href="#" style="color :white;">
                            <span class="h_nav_t icon_menu" style="line-height: 40px"></span>
                        </a>
                    </li>
                </ul>
            </div>
        </header>

        <!--弹出信息nav-->
        <div id="topLevelNav" class="top_level_container" style="display: none; opacity: 1;">
            <div class="i_cor"></div>
            <div class="top_level_nav fix">
                <a href="home483.html"><i class="i i_zx"></i>资讯</a>
                <a href="live.php"><i class="i i_live"></i>直播</a>
                <a href="video.php"><i class="i i_live"></i>宽频</a>
<!--                <a href="dianbo.php"><i class="i i_watch"></i>点播</a>-->
            </div>
        </div>

        <!--掌上南通下載框-->
        <div class="app-top-bar">
            <div class="icon"></div>
            <div class="title">掌上南通APP</div>
            <div class="describe">新闻，尽在掌握之中</div>
            <a href="http://www.ntwifi.cn" class="download-btn"><i class="ico-download"></i>立即下载</a>
        </div>

        <!--ckplayer播放器-->
        <div id="player">

        </div>

        <script type="text/javascript" src="http://media.ntjoy.com/ckplayer/ckplayer.js" charset="utf-8"></script>

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
            CKobject.embed("http://media.ntjoy.com/ckplayer/ckplayer.swf", "player", "ckplayer_player", "100%", "140%", false, flashvars, video);
        </script>

        <!--流量提醒-->
        <div class="network_environment_alert" style="margin-top: 5px;margin-bottom: 5px;font-size: 14px; color: #fff;text-align: center;background-color: #FFA928;padding: 5px">温馨提示：视频费流量，建议在WiFi下观看，土豪请随意。</div>

        <div style="height: 60px;">
            <div style="background: #80c269;float: left;height: 100%;width: 25%;line-height: 60px;" align="center" >
                <a  href="live.php?cid=1" style="color:#fff;font-size: 25px">新闻</a>
            </div>
            <div style="background: #06a7e1;float: left;height: 100%;width: 25%;line-height: 60px;" align="center" >
                <a  href="live.php?cid=2" style="color:#fff;font-size: 25px">都市</a>
            </div>
            <div style="background: #7e73b9;float: left;height: 100%;width: 25%;line-height: 60px;" align="center" >
                <a  href="live.php?cid=3" style="color:#fff;font-size: 25px">影视</a>
            </div>
            <div style="background: #f76a6f;float: left;height: 100%;width: 25%;line-height: 60px;" align="center" >
                <a  href="live.php?cid=4" style="color:#fff;font-size: 25px">休闲</a>
            </div>
        </div>

        <footer class="f_module" style="margin-top: 20px;font-size: 20px;line-height: 20px">
            <aside>m.ntjoy.com (苏新网备2012062号)</aside>
            <br/>
            <p style="font-size:15px">Copyright (C) 2011-2013 ntjoy.com All Rights Reserved 江海明珠网 南通广播电视台 南通新闻网 版权所有</p>

        </footer>

        <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>       
        <script src="js/ntjoy_live.js"></script>

    </body>

</html>