<?php
require_once __DIR__ . '/../PHP/autoload.php';

if (!isset($_GET['keyword'])) {
    $key_word = '南通';
} else {
    $key_word = $_GET['keyword'];
}

if (!$key_word) {
    $key_word = ' ';
}
?>

<!DOCTYPE html>

<html>
    <head>
        <title>內容搜索</title>
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


        <div class="search_loading" style="margin-top:100px;display: none">

            <div class="sk-folding-cube" >
                <div class="sk-cube1 sk-cube"></div>
                <div class="sk-cube2 sk-cube"></div>
                <div class="sk-cube4 sk-cube"></div>
                <div class="sk-cube3 sk-cube"></div>

            </div>
        </div>



        <div class="search_panel">


        </div>

        <aside class="search_load_more" style="display: none;">
            <span class="loading">努力搜索中....</span>
        </aside>

        <footer class="f_module">
            <aside>m.ntjoy.com (苏新网备2012062号)</aside>
        </footer>

        <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
        <script>
            var key_word = '<?= $key_word ?>';
            var count = 10;
            var offset = 0;
        </script>
        <script src="js/search/ntjoy_search.js"></script>

    </body>
</html>
