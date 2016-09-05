<?php
require_once __DIR__ . '/../PHP/autoload.php';

use Model\News\Hot\HotNews;

$column_id = 704;

$date_string = time();
$date_now = date('Y-m-d', $date_string);
$date_string = strtotime($date_now);

$hot_news = HotNews::getHotNews($column_id, $date_string);

/* 获取日期数组 */
$date_array = array();
for ($i = 0; $i < 30; $i++) {
    $cr_date_string = $date_string - (86400 * $i);
    $date_m = date('m', $cr_date_string);
    $date_m = (int) ($date_m);
    $date_d = date('d', $cr_date_string);
    $date_d = (int) ($date_d);

    if ($i == 0) {
        $date = "今天";
    } elseif ($i == 1) {
        $date = "昨天";
    } elseif ($i == 2) {
        $date = "前天";
    } else {
        $date = $date_m . "." . $date_d;
    }

    $date_array[] = ["date" => $date, "date_string" => $cr_date_string];
}
?>
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no"/>
        <title>每日推荐</title>
        <link href="css/hot/hot.css" rel="stylesheet">        
        <link href="css/news/ntjoy_news.min.css" rel="stylesheet">
    </head>

    <body style="overflow:auto;overflow-x:hidden">
        <!--文章头部-->
        <nav class="newsHead" data-sudaclick="mainNav">
            <h2><a class="h_txt" href="home3.html">江海明珠网</a></h2>
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
                </div>
            </div>
        </nav>

        <!--横向滚动-->
        <div class="roll-bar">
            <ul class="roll-bar-in">

                <?php
                $index = 0;
                foreach ($date_array as $value) {
                    if ($index == 0) {
                        ?>   
                        <li class="on" tid="<?= $value['date_string'] ?>"><a><?= $value['date'] ?></a></li>
                        <?php
                    } else {
                        ?>
                        <li tid="<?= $value['date_string'] ?>"><a><?= $value['date'] ?></a></li>
                        <?php
                    }
                    ?>
                    <?php
                    $index++;
                }
                ?>

            </ul>
        </div>

        <div class="main_panel">

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

                <div class="articles_con" id="articles_con_id">
                    <p>
                        <?= $value['content'] ?>
                    </p>
                </div>

                <div class="bottom_link">                    
                    <a class="totop">本文结束</a>
                </div>

                <?php
            }
            ?>
        </div>

        <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
        <script src="js/core/iscroll.min.js"></script>
        <script src="js/core/Jquery.lazyload.min.js"></script>
        <script>
            window.column_id = <?= $column_id ?>;
        </script>
        <script src="js/hot/hot.js"></script>
    </body>

</html>