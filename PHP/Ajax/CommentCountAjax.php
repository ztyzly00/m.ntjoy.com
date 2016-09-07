<?php

require_once __DIR__ . '/../autoload.php';

use Manager\CommentManager;
use Model\News\NewsOpt;

$newsid = $_REQUEST['newsid'];

echo CommentManager::getCommentCount($newsid);

/* 增加文章的点击率 */
NewsOpt::addPoint($newsid);
