<?php

require_once __DIR__ . '/../../autoload.php';
require_once __DIR__ . '/NewsRecommend.php';

//Model\News\NewsRecommend::getHotNews();
$rr = Model\News\NewsRecommend::getHotVideo(3);
print_r($rr);
