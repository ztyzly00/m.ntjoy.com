<?php

/*
 * 用于响应ajax请求的php
 */

require_once __DIR__ . '/../autoload.php';

use Model\News\NewsList;

$column_id = $_REQUEST['columnid'];
$offset = $_REQUEST['offset'];
$count = $_REQUEST['count'];

$list = NewsList::getNewsListByColumnId($column_id, $offset, $count);

//必要的值才输出，减少网络传输
for ($i = 0; $i < count($list); $i++) {
    $return_list[$i]['title'] = $list[$i]['title'];
    $return_list[$i]['id'] = $list[$i]['id'];
    //$return_list[$i]['title_cut'] = $list[$i]['title_cut'];
    $return_list[$i]['small_thumbfile_url'] = $list[$i]['small_thumbfile_url'];
    $return_list[$i]['brief_cut'] = $list[$i]['brief_cut'];
}

//print_r($return_list);

$return_json = json_encode($return_list);

echo $return_json;
