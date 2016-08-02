<?php
ob_start();

require_once __DIR__ . '/../PHP/autoload.php';

use Manager\NewsManager;

if (!isset($_GET['columnid'])) {
    $column_id = 359;
} else {
    $column_id = $_GET['columnid'];
}


$news_list = NewsManager::getNewsList($column_id);
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no"/>
        <meta charset="UTF-8">
        <title>江海明珠网</title>

        <!--加载css-->
        <link href="css/ntjoy_home.css" rel="stylesheet">
        <style>
            .nav_ntjoy_list a{
                width:33%;
                padding:0 0.6px;
            }
            .nav_ntjoy_list a:nth-child(3n) {
                padding-right: 0;
            }
            .nav_ntjoy_list a:nth-child(3n+1) {
                padding-left: 0;
            }
            .nav_ntjoy{
                padding:3px 0;
            }
        </style>
    </head>
    <body>
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


        <div id="topLevelNav" class="top_level_container" style="display: none; opacity: 1;">
            <div class="i_cor"></div>
            <div class="top_level_nav fix">
                <a href="home483.html"><i class="i i_zx"></i>资讯</a>  
                <a href="live.php"><i class="i i_live"></i>直播</a>
                <a href="video.php"><i class="i i_live"></i>宽频</a>
<!--                <a href="dianbo.php"><i class="i i_watch"></i>点播</a>-->
            </div>
        </div>

        <!--navi导航栏-->
        <section class="nav_ntjoy">
            <nav class="nav_ntjoy_list" id="nav_ntjoy_list_id">
                <a id="nav_item359" href="video.php?columnid=359">NTTV新闻</a>
                <a id="nav_item360" href="video.php?columnid=360" >城市日历</a>
                <a id="nav_item365" href="video.php?columnid=365">总而言之</a>
                <a id="nav_item362" href="video.php?columnid=362">媒体大放送</a>
                <a id="nav_item1596" href="video.php?columnid=1596">我想有个家</a>
                <a id="nav_item1113" href="video.php?columnid=1113">今晚在线</a>
<!--                <a id="nav_item305" href="video.php?columnid=305">日历(整档)</a>
                <a id="nav_item304" href="video.php?columnid=304">NTTV(整档)</a>
                <a id="nav_item310" href="video.php?columnid=310">言之(整档)</a>-->
                                <!--<a  href="javascript:;" class="toggle_btn_up" id="j_toggle_nav" title="点击展开"><span class="icon_open"></span></a>-->
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
                        <img src="<?= $news_list[$i]['small_thumbfile_url'] ?>">
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
        </section>
        <aside class="load-more j_load_bar" id="load_more_id" style="display:none">
            <span class="loading">小镇加载中.....</span>
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
        <script src="js/swipe.min.js"></script>
        <script src="js/ntjoy_home.js"></script>

    </body>
</html>

<?php
$flush = ob_get_contents();
file_put_contents(__DIR__ . "/static/home" . $column_id . ".html", $flush);
?>