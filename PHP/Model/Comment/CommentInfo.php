<?php

/**
 * 评论内容单例
 */

namespace Model\Comment;

use Core\MySql\Mysql_Model\XmMysqlObj;
use Core\Redis\RedisFactory;

class CommentInfo {

    /**
     * 根据commentid获取comment评论的所有数据
     * @param type $comment_id
     */
    public static function getCommentInfoById($comment_id) {

        $xm_mysql_obj = XmMysqlObj::getInstance();
        $redis_obj = RedisFactory::createRedisInstance();

        //redis缓存键值
        $redis_key = "comment_detail_" . $comment_id;

        if (!$return_array = $redis_obj->hGetAll($redis_key)) {
            //未命中缓存
            $query = "select * from m_ntjoy_comment_detail where commentid='$comment_id' limit 1";
            $fetch_array = $xm_mysql_obj->fetch_assoc($query);
            $return_array = $fetch_array[0];

            //缓存到redis中
            $redis_obj->hMset($redis_key, $return_array);
        }
        return $return_array;
    }

}
