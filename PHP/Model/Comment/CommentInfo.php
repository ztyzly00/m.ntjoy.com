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

            //数据修改,热数据  不常修改放在第一次取值时修改
            $return_array = CommentModify::modifyCommentInfo($return_array);

            //缓存到redis中
            $redis_obj->hMset($redis_key, $return_array);
        }

        //将评论赞的数据整合
        $return_array['upcount'] = self::getCommentUpCount($comment_id);

        return $return_array;
    }

    /**
     * 获取评论赞的数据
     * @param type $comment_id
     * @return type
     */
    public static function getCommentUpCount($comment_id) {

        $redis_obj = RedisFactory::createRedisInstance();

        //redis缓存键值
        $redis_key = "comment_upcount_" . $comment_id;

        if (!$upcount = $redis_obj->get($redis_key)) {
            $xm_mysql_obj = XmMysqlObj::getInstance();
            $query = "select upcount from m_ntjoy_comment_upcount where commentid='$comment_id' limit 1";
            $fetch_array = $xm_mysql_obj->fetch_assoc($query);
            $upcount = $fetch_array[0]['upcount'];
            $redis_obj->set($redis_key, $upcount);
        }

        return $upcount;
    }

}
