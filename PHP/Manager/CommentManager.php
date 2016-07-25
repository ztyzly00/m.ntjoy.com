<?php

/*
 * 内容管理，直接跟内容打交道，后期可以做数据库路由操作,类似于controller 但不做内容页面渲染路由。
 */

namespace Manager;

use Model\Comment\CommentList;
use Model\Comment\CommentOpt;
use Model\Comment\CommentInfo;
use Model\Comment\CommentCount;

class CommentManager {

    public static function insertComment($comment_array) {
        //进行内容处理
        if (!$comment_array['userid']) {
            //匿名userid
            $comment_array['userid'] = 'ano_' . uniqid();
        }
        CommentOpt::insertComment($comment_array);
    }

    public static function getCommentCount($newsid) {
        return CommentCount::getCommentCount($newsid);
    }

    public static function getCommentById($commentid) {
        return CommentInfo::getCommentInfoById($commentid);
    }

    public static function getCommentListByUpCount($newsid, $offset, $count) {
        return CommentList::getCommentListRangeByUpCount($newsid, $offset, $offset + $count - 1);
    }

    public static function getCommentListByTime($newsid, $offset, $count) {
        return CommentList::getCommentListRangeByTime($newsid, $offset, $count);
    }

}
