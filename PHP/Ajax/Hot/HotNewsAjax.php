<?php

require_once __DIR__ . '/../../autoload.php';

use Model\News\Hot\HotNews;

$column_id = $_REQUEST['columnid'];
$date_string = $_REQUEST['datestring'];

$hot_list = HotNews::getHotNews($column_id, $date_string);

$return_json = json_encode($hot_list);

echo $return_json;
