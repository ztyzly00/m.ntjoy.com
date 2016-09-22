<?php

require_once __DIR__ . '/../../autoload.php';

use Manager\NewsManager;

$classify = $_REQUEST['classify'];

if ($classify == 'news') {
    $recommend_list = NewsManager::getHotNews();
} else if ($classify == 'img') {
    $recommend_list = NewsManager::getHotImg();
} else if ($classify == 'video') {
    $recommend_list = NewsManager::getHotVideo();
}

$return_list = array();

/* 返回要用的数据，避免不必要的网络传输 */
for ($i = 0; $i < count($recommend_list); $i++) {
    $return_list[$i]['id'] = $recommend_list[$i]['id'];
    $return_list[$i]['small_thumbfile_url'] = $recommend_list[$i]['small_thumbfile_url'];
    $return_list[$i]['title'] = $recommend_list[$i]['title'];
    $return_list[$i]['pubdate_without_year'] = $recommend_list[$i]['pubdate_without_year'];
    $return_list[$i]['colname'] = $recommend_list[$i]['colname'];
}

$return_json = json_encode($return_list);

echo $return_json;
