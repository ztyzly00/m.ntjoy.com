<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace Model\Comment;

use Core\MySql\Mysql_Model\XmMysqlObj;
use Core\Redis\RedisFactory;

class CommentCount {

    public static function getCommentCount($newsid) {
        $redis_obj = RedisFactory::createRedisInstance();
        $redis_key = "comment_count_" . $newsid;

        if (!$comment_count = $redis_obj->get($redis_key)) {
            //未命中缓存
            $xm_mysql_obj = XmMysqlObj::getInstance();
            $query = "select commentcount from m_ntjoy_news_comment_count where newsid=$newsid limit 1";
            $fetch_array = $xm_mysql_obj->fetch_assoc($query);
            $comment_count = $fetch_array[0]['commentcount'];
            $redis_obj->set($redis_key, $comment_count);
        }

        if (!$comment_count) {
            $comment_count = 0;
        }

        return $comment_count;
    }

}
