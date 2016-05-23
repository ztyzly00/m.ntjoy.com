<?php

require_once __DIR__ . '/../autoload.php';

use Manager\CommentManager;

$newsid = $_POST['newsid'];
$offset = $_POST['offset'];
$count = $_POST['count'];

$array = CommentManager::getCommentListByTime($newsid, $offset, $count);

echo json_encode($array);
