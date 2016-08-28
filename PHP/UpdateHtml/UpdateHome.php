<?php

/*
 * 刷新新闻列表缓存和刷新新闻主页的静态页面
 * (不推荐用exec方式进行，后期进行修改)
 */

require_once 'UpdateColumn.php';



$array = UpdateColumn::$column_array;
$redis = new redis();
$redis->connect('127.0.0.1', 6379);

//将redis中的新闻列表删除
for ($i = 0; $i < count($array); $i++) {
    $redis->delete("news_list" . $array[$i]);
}

//重建redis中的新闻列表缓存
exec("php " . __DIR__ . "/UpdateAjaxRedis.php");

//刷新主页面的静态文件
for ($i = 0; $i < count($array); $i++) {
    $url = "http://xm.ntwifi.cn/m.ntjoy.com/Page/home.php?columnid=$array[$i]";
    $hehe = file_get_contents($url);
    echo $url . "\n";
}

//刷新每个列表前20新闻静态页(非必要)
//exec("php " . __DIR__ . "/UpdateArticle.php");
