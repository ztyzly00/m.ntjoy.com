<?php

require_once 'autoload.php';

use Model\News\NewsList;

$array = NewsList::getNewsListByColumnId(10, 0, 1);

print_r($array);
