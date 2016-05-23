<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace Manager;

use Model\Comment\CommentList;
use Model\Comment\CommentOpt;
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

    public static function getCommentListByUpCount($newsid, $offset, $count) {
        return CommentList::getCommentListRangeByUpCount($newsid, $offset, $offset + $count - 1);
    }

    public static function getCommentListByTime($newsid, $offset, $count) {
        return CommentList::getCommentListRangeByUpCount($newsid, $offset, $offset + $count - 1);
    }

    
    
}
