<?php
require_once __DIR__ . '/../PHP/autoload.php';

use Model\News\Hot\HotNews;

$hot_news = HotNews::getHotNews(704);
?>
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no"/>
        <title>每日推荐</title>
        <link href="css/hot/hot.css" rel="stylesheet">
        <!--<link href="css/home/ntjoy_home.min.css" rel="stylesheet">-->
        <link href="css/news/ntjoy_news.min.css" rel="stylesheet">

    </head>

    <body style="overflow:auto;overflow-x:hidden">

        <!--文章头部-->
        <nav class="newsHead" data-sudaclick="mainNav">
            <h2><a class="h_txt" href="home3.html">江海明珠网</a></h2>
            <!-- //页面加载时只需要加载外部a标签 -->
            <!--<a href="#" class="hIcon h_user" title="" id="loginBox"></a>-->
            <a href="#" id="h_nav_menu" class="hIcon h_nav" title=""></a>
            <ul class="h_nav_items">
                <li><a>每日推荐</a></li>
            </ul>

            <div class="ntjoy_menu" style="display:none">
                <div>
                    <input class="search_input" type="text" placeholder="搜索自己想看的内容！">
                    <button class="search_button" type="button">
                        搜索
                    </button>
                </div>
            </div>

            <div id="topLevelNav" class="top_level_container" style="display: none; opacity: 1;">

                <div class="top_level_nav fix">
                    <a href="home3.html"><i class="i i_zx"></i>主页</a>  
                    <a href="live.php"><i class="i i_live"></i>直播</a>
                    <a href="video.php"><i class="i i_live"></i>宽频</a>
    <!--                <a href="dianbo.php"><i class="i i_watch"></i>点播</a>-->
                </div>
            </div>
        </nav>

        <!--横向滚动-->
        <div class="roll-bar">
            <ul class="roll-bar-in">
                <li class="on" tid="0"><a>今天</a></li>
                <li tid="1"><a>昨天</a></li>
                <li tid="3"><a>9.2</a></li>
                <li tid="129"><a>9.1</a></li>
                <li tid="4"><a>8.31</a></li>
                <li tid="3"><a>9.2</a></li>
                <li tid="129"><a>9.1</a></li>
                <li tid="4"><a>8.31</a></li>
                <li tid="3"><a>9.2</a></li>
                <li tid="129"><a>9.1</a></li>
                <li tid="4"><a>8.31</a></li>
                <li tid="3"><a>9.2</a></li>
                <li tid="129"><a>9.1</a></li>
                <li tid="4"><a>8.31</a></li>

            </ul>
        </div>


        <?php
        foreach ($hot_news as $value) {
            ?>
            <div class="hot_articles">
                <div class="articles_img"
                     style="background-image:url('<?= $value['common_img_url'] ?>')">
                    <div class="overlay"></div>
                    <div class="articles_inner">
                        <div class="post-head">
                            <h1 class="title"><?= $value['title'] ?></h1>
                        </div>
                        <div class="post-meta">
                            <div class="autor-meta">
                                <span class="post-time"><?= $value['pubdate'] ?></span>
                                <span class="post-name"><?= $value['name'] ?></span>
                                <span class="post-category">江海明珠网</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="articles_con">
                <p>
                    <?= $value['brief'] ?>
                </p>
            </div>
            <?php
        }
        ?>

        <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
        <script src="js/core/iscroll.min.js"></script>
        <script src="js/hot/hot.js"></script>
    </body>

</html>