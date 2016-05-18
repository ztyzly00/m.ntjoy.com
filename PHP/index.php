<?php

require_once 'autoload.php';

use Model\NewsList;

$array = NewsList::getNewsListByColumnId(3, 0, 3);

print_r($array);
