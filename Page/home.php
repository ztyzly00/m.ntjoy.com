<?php
ob_start();

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

                <a id="nav_item3"  href="home3.html">要闻</a>
                <a id="nav_item704" href="home704.html">快讯</a>
                <a href="#">点播</a>
                <a href="#">直播</a>
                <a id="nav_item4" href="home4.html">社会</a>
                <a id="nav_item5" href="home5.html">民生</a>
                <a id="nav_item6" href="home6.html">省内</a>
                <a id="nav_item7" href="home7.html">国内</a>
                <a id="nav_item8" href="home8.html">国际</a>
                <a id="nav_item483" href="home483.html">网罗</a>
                <a id="nav_item9" href="home9.html">市区</a>
                <a id="nav_item1377" href="home1377.html" class="hide">娱乐</a>
                <a id="nav_item10" href="home10.html" class="hide">如皋</a>
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
                        for ($i = 0; $i < 3; $i++) {
                            ?>
                            <div class="item" style="">
                                <a href="news<?= $news_list[$i]['id'] ?>.html">
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
        <aside class="load-more j_load_bar">
            <span class="loading">小镇加载中.....</span>
        </aside>
        <!--回顶部-->
        <aside class="topbtn j_topBtn" id="j_toTop" style="display: none;">
            <span class="icon_top_1"></span>
        </aside>

        <div id="test"></div>



        <!--加载js-->
        <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
        <script>
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