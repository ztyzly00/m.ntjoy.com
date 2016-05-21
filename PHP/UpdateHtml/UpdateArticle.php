<?php

/*
 * 刷新新闻具体页面的静态页面
 */

require_once 'UpdateColumn.php';

require_once __DIR__ . '/../autoload.php';

use Model\News\NewsList;

$array = UpdateColumn::$column_array;
$redis = new redis();
$redis->connect('127.0.0.1', 6379);

for ($i = 0; $i < count($array); $i++) {
    $list = NewsList::getNewsListByColumnId($array[$i], 0, 20);
    echo count($list);
    for ($j = 0; $j < count($list); $j++) {
        $url = "http://xm.ntwifi.cn/m.ntjoy.com/Page/news.php?id=" . $list[$j]['id'];
        $rr = file_get_contents($url);
    }
    //$rr = file_get_contents("http://xm.ntwifi.cn/m.ntjoy.com/Page/news.php?id=" . $list['id']);
}