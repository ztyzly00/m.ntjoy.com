<?php

require_once 'autoload.php';

use Model\NewsList;

$array = NewsList::getNewsListByColumnId(8, 0, 1);

print_r($array);
