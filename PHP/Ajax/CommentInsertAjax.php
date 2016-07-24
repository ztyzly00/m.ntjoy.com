<?php

require_once __DIR__ . '/../autoload.php';

use Manager\CommentManager;

$comment_array['userid'] = $_REQUEST['userid'];
$comment_array['newsid'] = $_REQUEST['newsid'];
$comment_array['tocommentid'] = $_REQUEST['tocommentid'];
$comment_array['comment'] = $_REQUEST['comment'];


if ($comment_array['comment']) {
//    echo '评论审核中';
//    return;
    CommentManager::insertComment($comment_array);
} else {
    echo '评论失败';
}
