<?php

require_once __DIR__ . '/../autoload.php';

use Model\Search\SearchModel;

//$array = SearchModel::getSearchByWord('测', 10, 0);

$array = SearchModel::getSearchByWordFromAllNews('还是想', 10, 0);
print_r($array);
