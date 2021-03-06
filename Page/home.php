<?php
ob_start();

require_once __DIR__ . '/../PHP/autoload.php';

use Config\WebConfig;
use Manager\NewsManager;

if (!isset($_GET['columnid'])) {
    $column_id = 704;
} else {
    $column_id = $_GET['columnid'];
}
$news_list = NewsManager::getNewsList($column_id);
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no"/>
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-touch-fullscreen" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <title>江海明珠网</title>

        <!--加载css-->
        <link href="css/home/ntjoy_home.min.css" rel="stylesheet">
    </head>
    <body>

        <!-- 顶部区域 -->
        <header class="ntjoy_header">
            <div align="center" style="color: #ffffff">                
                <ul class="h_nav" style="float: left;">
                    <li class="h_nav_li" id="j_menu">
                        <a href="#" id="loginBox" style="color: white"><span
                                class=" h_nav_t icon_menu" style="line-height: 40px"></span></a>
                    </li>
                </ul>
                <a style="color:white;font-size:24px;line-height: 40px">江海明珠网</a>
                <ul class="h_nav">
                    <li class="h_nav_li" id="j_search">
                        <a href="#" style="color :white;">
                            <span class="h_nav_t icon_search" style="line-height: 40px"></span>
                        </a>
                    </li>
                </ul>
            </div>
        </header>

        <!--菜单区域-->
        <div class="head_tc_nav_new" id="head_menu" style="display: none;">
            <div class="search_dor clearfix">
                <a href="live.php" class="zhibo" id="">直播</a>
                <a href="video.php" class="kuanpin" id="">宽频</a>
            </div>

            <div class="three_btn">
                <a href="#" >首页</a>
                <a href="http://www.ntwifi.cn" >客户端</a>
                <a href="search.php?keyword=" >搜索</a>
            </div>

            <div class="battom_waitao"><div class="bottom_bac"></div></div>
            <div class="arrow"></div>
        </div>

        <!--搜索区域-->
        <div class="ntjoy_search_menu" style="display:none">
            <div>
                <input class="search_input" type="text" placeholder="搜索自己想看的内容！">
                <button class="search_button" type="button">
                    搜索
                </button>
            </div>
        </div>

        <!--navi导航栏-->
        <section class="nav_ntjoy">
            <nav class="nav_ntjoy_list" id="nav_ntjoy_list_id">
                <!--显示-->
                <a id="nav_item3"  href="home3.html">要闻</a>
                <a id="nav_item4" href="home4.html">社会</a>
                <a id="nav_item5" href="home5.html">民生</a>
                <a id="nav_item7" href="home7.html">国内</a>
                <a id="nav_item8" href="home8.html">国际</a>
                <a id="nav_item483" href="home483.html">网罗</a>
                <a id="nav_item1377" href="home1377.html" >娱乐</a>
                <a id="nav_item6" href="home6.html">省内</a>
                <a id="nav_item9" href="home9.html">市区</a>
                <a id="nav_item5" href="live.php" style="color:#ff0000;font-weight: 600">直播</a>
                <a id="nav_item5" href="video.php" style="color:#ff0000;font-weight: 600">宽频</a>
                <!--隐藏-->
                <a id="nav_item229" href="home229.html" class="hide">组图</a>
                <a id="nav_item10" href="home10.html"  class="hide">如皋</a>
                <a id="nav_item11" href="home11.html" class="hide">如东</a>
                <a id="nav_item12" href="home12.html" class="hide">海安</a>
                <a id="nav_item13" href="home13.html" class="hide">海门</a>
                <a id="nav_item14" href="home14.html" class="hide">启东</a>
                <a  href="javascript:;" class="toggle_btn_up" id="j_toggle_nav" title="点击展开"><span class="icon_open"></span></a>
            </nav>
        </section>

        <!--侧滑图片-->
        <section class="pic_slide">
            <aside class="pic_slide_list" id="ntjoy_imgSlide">
                <div class="top_slide_wrap" id="top_slide_wrap_id" style="">
                    <div class="swipe-wrap">
                        <?php
                        for ($i = 0; $i < 2; $i++) {
                            ?>
                            <div class="item" style="">
                                <a href="news<?= $news_list[$i]['id'] ?>.html">
                                    <img src="<?= $news_list[$i]['common_img_url'] ?>">
                                    <span class="pic_slide_info">
                                        <i class="pic_slide_t"><?= $news_list[$i]['title_cut'] ?></i>
                                    </span>
                                </a>
                            </div>
                            <?php
                        }
                        ?>                       
                    </div>
                </div>
            </aside>
            <aside class="pic_slide_num">
                <span class="curNum" id="j_topSlide_index">1</span>
                /
                <em class="j_slide_sum">1</em>
            </aside>
        </section>

        <!--HOT区域-->
        <section class="card_module">
            <ul class="recommend_items j_roll" id="j_news_scroll" data-sudaclick="ls_live">
                <li>
                    <span>HOT</span>
                    <a href="news<?= $news_list[2]['id'] ?>.html" title=""><?= $news_list[2]['title'] ?></a>
                </li>
            </ul>
        </section>

        <!--新闻区域-->
        <section class="card_module j_normal_card " id="main_news">            
            <?php
            for ($i = 3; $i < count($news_list); $i++) {
                ?>
                <a href="news<?= $news_list[$i]['id'] ?>.html">
                    <dl class="f_card">
                        <dt class="f_card_dt">
                        <img  src="<?= $news_list[$i]['small_thumbfile_url'] ?>">
                        </dt>
                        <dd class="f_card_dd">
                            <h3 class="f_card_h3 ellipsis"><?= $news_list[$i]['title'] ?></h3>
                            <p class="f_card_p"><?= $news_list[$i]['brief_cut'] ?></p>
                            <div class="f_card_icon">
                                <span class="comment">
                                    0
                                    <em class="icon_comment">
                                    </em>
                                </span>
                            </div>
                        </dd>
                    </dl>
                </a>
                <?php
            }
            ?>
            <!--            <a href="http://world.people.com.cn/GB/8212/191816/402465/index.html">
                            <img src="http://www.ntjoy.com/res/sy201308/images/G20l.jpg" width="100%">
                            <img src="http://i1.piimg.com/4851/09ede60e4492aa60.jpg" width="100%">
                        </a>-->
            <!--            <a href="http://www.ntjoy.com/zt/zt2016/xmjxs/">
                            <img src="img/image/xiangmu.jpg" width="100%">
                            <img src="http://i1.piimg.com/4851/09ede60e4492aa60.jpg" width="100%">
                        </a>-->
        </section>
        <aside class="load-more j_load_bar" id="load_more_id" style="display:none">
            <span class="loading">加载中.....</span>
        </aside>

        <!--回顶部-->
        <aside class="topbtn j_topBtn" id="j_toTop" style="display: none;">
            <span class="icon_top_1"></span>
        </aside>

        <!--底部-->
        <footer class="f_module">
            <aside>m.ntjoy.com (苏新网备2012062号)</aside>
        </footer>

        <!--加载js-->
        <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
        <!--<script src="js/jquery.min.js"></script>-->
        <script>
            var columnid =<?= $column_id ?>;
            var offset = 9;
            var count = 5;
            $(function() {
                $('#nav_item<?= $column_id ?>').css('color', '#129bf0');
                $('#nav_item<?= $column_id ?>').css('font-size', '20px');
                $('#nav_item<?= $column_id ?>').css('font-weight', '700');
            });
        </script>
        <!--<script src="http://apps.bdimg.com/libs/swipe/2.0/swipe.min.js"></script>-->
        <script src="js/core/swipe.min.js"></script>
        <script src="js/home/ntjoy_home.js"></script>

    </body>
</html>

<?php
$flush = ob_get_contents();

if (WebConfig::$static) {
    file_put_contents(__DIR__ . "/static/home" . $column_id . ".html", $flush);
}

?>