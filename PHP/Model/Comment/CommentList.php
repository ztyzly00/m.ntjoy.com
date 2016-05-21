<?php

/*
 * 评论列表类
 */

namespace Model\Comment;

use Core\MySql\Mysql_Model\XmMysqlObj;
use Core\Redis\RedisFactory;

class CommentList {

    public static function getCommentListRangeByUpCount($newsid, $offset, $count) {
        $redis_obj = RedisFactory::createRedisInstance();
        $xm_mysql_obj = XmMysqlObj::getInstance();

        $redis_key = 'news_comment_range_upcount_' . $newsid;
        if (!$upcount_list = $redis_obj->zRevRange($redis_key, $offset, $count)) {
            //缓存未命中
            $mysql_count = $count - $offset + 1;
            $query = "select mncu.upcount,mncd.commentid from m_ntjoy_comment_detail mncd "
                    . "left join m_ntjoy_comment_upcount mncu on mncu.commentid=mncd.commentid "
                    . "where mncd.newsid=$newsid "
                    . "order by mncu.upcount desc limit $mysql_count";
            $fetch_array = $xm_mysql_obj->fetch_assoc($query);

            //redis缓存相应数据
            for ($i = 0; $i < count($fetch_array); $i++) {
                $redis_obj->zAdd($redis_key, $fetch_array[$i]['upcount'], $fetch_array[$i]['commentid']);
            }
        }
    }

    public static function getCommentListRangeByTime() {
        $redis_obj = RedisFactory::createRedisInstance();
        $xm_mysql_obj = XmMysqlObj::getInstance();
    }

}
