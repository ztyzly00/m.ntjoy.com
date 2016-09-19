<?php

require_once __DIR__ . '/../../autoload.php';
require_once __DIR__ . '/NewsRecommend.php';

//$news_info=  Model\News\NewsInfo::getNewsInfoById('508683');
//
//print_r($news_info['content']);



$news_list = Model\News\NewsRecommend::getRecommend(3, 'img');

print_r($news_list);
