<?php

/*
 * 刷新redis中的新闻列表
 */

require_once 'UpdateColumn.php';
require_once __DIR__ . '/../autoload.php';

use Model\NewsList;

$array = UpdateColumn::$column_array;
$redis = new redis();
$redis->connect('127.0.0.1', 6379);

for ($i = 0; $i < count($array); $i++) {
    NewsList::updateColumnList($array[$i]);
}