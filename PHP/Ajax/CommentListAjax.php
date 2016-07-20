<?php

require_once __DIR__ . '/../autoload.php';

use Manager\CommentManager;

$newsid = $_REQUEST['newsid'];
$offset = $_REQUEST['offset'];
$count = $_REQUEST['count'];

$array = CommentManager::getCommentListByTime($newsid, $offset, $count);

echo json_encode($array);
