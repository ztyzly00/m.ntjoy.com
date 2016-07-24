<?php

require_once __DIR__ . '/../autoload.php';

use Manager\CommentManager;

$newsid = $_REQUEST['newsid'];

echo CommentManager::getCommentCount($newsid);
