<?php

/*
 * 评论列表类
 */

namespace Model\Comment;

use Core\MySql\Mysql_Model\XmMysqlObj;
use Core\Redis\RedisFactory;

class CommentList {

    /**
     * 按照赞的数目排序
     * @param type $newsid
     * @param type $start
     * @param type $end 注意不能为-1，唯一与redis有冲突的地方    
     * @return type
     */
    public static function getCommentListRangeByUpCount($newsid, $start, $end) {

        $redis_obj = RedisFactory::createRedisInstance();
        $redis_key = 'news_comment_range_upcount_' . $newsid;
        $upcount_list_count = $redis_obj->zSize($redis_key);

        if ($upcount_list_count < $end) {

            $xm_mysql_obj = XmMysqlObj::getInstance();

            //缓存未命中
            $mysql_count = $end + 1;
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

        //从缓存中提取数据
        $upcount_list = $redis_obj->zRevRange($redis_key, $start, $end);

        for ($i = 0; $i < count($upcount_list); $i++) {
            $return_list[] = CommentInfo::getCommentInfoById($upcount_list[$i]);
        }

        return $return_list;
    }

    /**
     * 按照时间排序
     * @param type $newsid
     * @param type $start
     * @param type $end  注意不能为-1，唯一与redis有冲突的地方    
     * @return type
     */
    public static function getCommentListRangeByTime($newsid, $start, $end) {
        $redis_obj = RedisFactory::createRedisInstance();
        $redis_key = 'news_comment_range_time_' . $newsid;
        $upcount_list_count = $redis_obj->zSize($redis_key);

        if ($upcount_list_count < $end) {
            //缓存未命中
            $xm_mysql_obj = XmMysqlObj::getInstance();

            //mysql预取值，预先取10000,后续不足有需求时再做判定
            $mysql_count = 10000;
            $query = "select commentid,time from m_ntjoy_comment_detail where newsid=$newsid order by time desc limit $mysql_count";
            $fetch_array = $xm_mysql_obj->fetch_assoc($query);

            //redis缓存相应数据
            for ($i = 0; $i < count($fetch_array); $i++) {
                $redis_obj->zAdd($redis_key, $fetch_array[$i]['time'], $fetch_array[$i]['commentid']);
            }
        }

        //从缓存中提取数据
        $time_list = $redis_obj->zRevRange($redis_key, $start, $end);


        for ($i = 0; $i < count($time_list); $i++) {
            $return_list[] = CommentInfo::getCommentInfoById($time_list[$i]);
        }

        return $return_list;
    }

}
