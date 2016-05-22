<?php

require_once __DIR__ . '/../autoload.php';

use Manager\CommentManager;

$comment_array['userid'] = $_POST['userid'];
$comment_array['newsid'] = $_POST['newsid'];
$comment_array['touserid'] = $_POST['touserid'];
$comment_array['comment'] = $_POST['comment'];


if ($comment_array['comment']) {
    echo '评论成功';
    CommentManager::insertComment($comment_array);
} else {
    echo '评论失败';
}
