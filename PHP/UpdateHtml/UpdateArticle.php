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
    for ($j = 0; $j < count($list); $j++) {
        $url = "http://xm.ntwifi.cn/m.ntjoy.com/Page/news.php?id=" . $list[$j]['id'];
        print_r($url . "\n");
        $rr = file_get_contents($url);
    }
}

//不推荐用，会造成单核100% ，卡死大部分正常请求
//$mh = curl_multi_init();
//
//for ($i = 0; $i < count($array); $i++) {
//    $list = NewsList::getNewsListByColumnId($array[$i], 0, 20);
//    for ($j = 0; $j < count($list); $j++) {
//        $url = "http://xm.ntwifi.cn/m.ntjoy.com/Page/news.php?id=" . $list[$j]['id'];
//        $ch = curl_init();
//        curl_setopt($ch, CURLOPT_URL, $url);
//        curl_multi_add_handle($mh, $ch);
//    }
//}
//
//$running = null;
//do {
//    curl_multi_exec($mh, $running);
//} while ($running > 0);
