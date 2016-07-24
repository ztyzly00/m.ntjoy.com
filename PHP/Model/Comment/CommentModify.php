<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace Model\Comment;

class CommentModify {

    public static function modifyCommentInfo($array) {

        //评论的时间改为通用的
        $array['time'] = date("Y-m-d H:i:s", $array['time']);

        //如果是匿名用户
        if (substr($array['userid'], 0, 1) == 'a') {
            $array['nickname'] = '匿名用户';
        }
        
        return $array;
    }

}
