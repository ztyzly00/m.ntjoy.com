<?php

require_once 'autoload.php';

use Model\NewsList;

$array = NewsList::getNewsListByColumnId(3, 0, 10);

print_r($array);
