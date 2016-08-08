<?php

require_once __DIR__ . '/../../autoload.php';

use Model\Search\SearchModel;

$key_word = $_GET['keyword'];
$count = $_GET['count'];
$offset = $_GET['offset'];

$list = SearchModel::getSearchByWord($key_word, $count, $offset);

$return_json = json_encode($list);

echo $return_json;


