<?php
require_once __DIR__ . '/../PHP/autoload.php';

use Manager\CommentManager;

//$newsid = $_GET['newsid'];
$newsid = 486458;

$comment_count = CommentManager::getCommentCount($newsid);


$comment_lisft_by_ftime = CommentManager::getCommentListByTime($newsid, 0, 5);


$comment_list_by_upcount = CommentManager::getCommentListByUpCount($newsid, 0, 5);
//print_r($comment_list_by_upcount);
?>


<html lang="en">
    <head>

    </head>
    <body>

    </body>
</html>