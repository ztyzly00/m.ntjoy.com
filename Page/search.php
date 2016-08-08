<?php
require_once __DIR__ . '/../PHP/autoload.php';

use Model\Search;

if (!isset($_GET['keyword'])) {
    $key_word = '南通';
} else {
    $key_word = $_GET['keyword'];
}

if (!$key_word) {
    $key_word = '南通';
}

$list = Search\SearchModel::getSearchByWord($key_word, 10, 0);
?>

<!DOCTYPE html>

<html>
    <head>
        <title>404</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no"/>
        <link href="css/search/ntjoy_search.css" rel="stylesheet">
    </head>
    <body>

        <div class="top" align="center">
            <div>
                <input class="search_input" type="text" placeholder="请输入搜索关键字">
                <button class="search_button" type="button">
                    搜索
                </button>
                <button class="home_button" type="button" style="background-color: #00bb9c;">
                    主页
                </button>
            </div>
        </div>

        <div class="search_panel">

            <?php
            for ($i = 0; $i < count($list); $i++) {
                ?>      
                <a href="news<?= $list[$i]['id'] ?>.html">
                    <div class="search_div">
                        <div class="j_art_lazy">
                            <img class="search_img"
                                 src="<?= $list[$i]['small_thumbfile_url'] ?>"
                                 style="display: block;">
                        </div>
                        <div>
                            <h3 class="search_title"><?= $list[$i]['title'] ?></h3>
                            <div class="search_time">
                                <time><?= $list[$i]['pubdate'] ?></time>
                            </div>
                        </div>
                    </div>
                </a>
                <?php
            }
            ?>

            <aside class="search_load_more" style="display: none;">
                <span class="loading">努力搜索中....</span>
            </aside>
        </div>

        <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
        <script>
            var key_word = '<?= $key_word ?>';
            var count = 10;
            var offset = 0;
        </script>
        <script src="js/search/ntjoy_search.js"></script>

    </body>
</html>
