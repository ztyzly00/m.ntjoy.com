<?php
require_once __DIR__ . '/../PHP/autoload.php';

use Manager\NewsManager;

$column_id = $_GET['columnid'];
if (!$column_id) {
    $column_id = 3;
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
    </head>
    <body>
        <header class="ntjoy_header">
            <div align="center" style="color: #ffffff">
                <!--<img src="img/ntjoy_logo.png">-->
                <ul class="h_nav" style="float: left;">
                    <li class="h_nav_li">
                        <a href="#" id="loginBox" style="color: white"><span
                                class=" h_nav_t icon_user" style="line-height: 40px">个人中心</span></a>
                    </li>
                </ul>
                <font size="5">江海明珠网</font>
                <ul class="h_nav">
                    <li class="h_nav_li" id="j_menu">
                        <a href="#" style="color :white;">
                            <span class="h_nav_t icon_menu" style="line-height: 40px"></span>
                        </a>
                    </li>
                </ul>
            </div>
        </header>

        <!--navi导航栏-->
        <section class="nav_ntjoy">
            <nav class="nav_ntjoy_list" id="nav_ntjoy_list_id">

                <a href="home.php?columnid=3">要闻</a>
                <a href="home.php?columnid=704">快讯</a>
                <a href="#">点播</a>
                <a href="#">直播</a>
                <a href="home.php?columnid=4">社会</a>
                <a href="home.php?columnid=5">民生</a>
                <a href="home.php?columnid=6">省内</a>
                <a href="home.php?columnid=7">国内</a>
                <a href="home.php?columnid=8">国际</a>
                <a href="home.php?columnid=483">网罗</a>
                <a href="home.php?columnid=9">市区</a>
                <a href="home.php?columnid=1377" class="hide">娱乐</a>
                <a href="home.php?columnid=10" class="hide">如皋</a>
                <a href="home.php?columnid=11" class="hide">如东</a>
                <a href="home.php?columnid=12" class="hide">海安</a>
                <a href="home.php?columnid=13" class="hide">海门</a>
                <a href="home.php?columnid=14" class="hide">启东</a>
                <a href="javascript:;" class="toggle_btn_up" id="j_toggle_nav" title="点击展开"><span class="icon_open"></span></a>
            </nav>
        </section>

        <!--侧滑图片-->
        <section class="pic_slide">
            <aside class="pic_slide_list" id="ntjoy_imgSlide">
                <div class="top_slide_wrap" id="top_slide_wrap_id" style="">
                    <div class="swipe-wrap">
                        <?php
                        for ($i = 0; $i < 3; $i++) {
                            ?>
                            <div class="item" style="">
                                <a href="#">
                                    <img src="<?= $news_list[$i]['thumbfile2_url'] ?>">
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
                    <a href="#" title=""><?= $news_list[4]['title'] ?></a>
                </li>
            </ul>
        </section>

        <!--新闻区域-->
        <section class="card_module j_normal_card ">            
            <?php
            for ($i = 5; $i < count($news_list); $i++) {
                ?>
                <a href="#">
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

        <!--回顶部-->
        <aside class="topbtn j_topBtn" id="j_toTop" style="display: none;">
            <span class="icon_top_1"></span>
        </aside>

        <div id="test"></div>

        <!--加载js-->
        <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
        <script src="js/swipe.min.js"></script>
        <script src="js/ntjoy_home.js"></script>

    </body>
</html>