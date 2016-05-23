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
     * 
     * 缓存策略，10000以内用redis读取，10000以外用mysql读取
     * 0到4  start=0；start=4   但是只有两条数据
     */
    public static function getCommentListRangeByUpCount($newsid, $start, $end) {

        $redis_obj = RedisFactory::createRedisInstance();
        $redis_key = 'news_comment_range_upcount_' . $newsid;

        $upcount_list = array();
        $return_list = array();

        if (!$redis_obj->get('cmt_list_upcount_flush' . $newsid)) {
            //一次刷新数量
            $mysql_count = 6;
            $xm_mysql_obj = XmMysqlObj::getInstance();

            $query = "select mncu.upcount,mncd.commentid from m_ntjoy_comment_detail mncd "
                    . "left join m_ntjoy_comment_upcount mncu on mncu.commentid=mncd.commentid "
                    . "where mncd.newsid=$newsid "
                    . "order by mncu.upcount desc limit $mysql_count";
            $fetch_array = $xm_mysql_obj->fetch_assoc($query);

            //redis缓存相应数据
            for ($i = 0; $i < count($fetch_array); $i++) {
                $redis_obj->zAdd($redis_key, $fetch_array[$i]['upcount'], $fetch_array[$i]['commentid']);
                $upcount_list[] = $fetch_array[$i]['commentid'];
            }

            //标记刷新缓存
            $redis_obj->set('cmt_list_upcount_flush' . $newsid, 1);
        } else {
            $upcount_list = $redis_obj->zRevRange($redis_key, $start, $end);
        }

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
     * 
     * 缓存策略，10000以内用redis读取，10000以外用mysql读取
     * 0到4  start=0；start=4   但是只有两条数据
     */
    public static function getCommentListRangeByTime($newsid, $start, $end) {
        $redis_obj = RedisFactory::createRedisInstance();
        $redis_key = 'news_comment_range_time_' . $newsid;

        $time_list = array();
        $return_list = array();

        if (!$redis_obj->get('cmt_list_time_flush' . $newsid)) {
            //缓存未命中
            $xm_mysql_obj = XmMysqlObj::getInstance();

            //mysql预取值，预先取10000,后续不足有需求时再做判定
            $mysql_count = 10000;
            $query = "select commentid,time from m_ntjoy_comment_detail where newsid=$newsid order by time desc limit $mysql_count";
            $fetch_array = $xm_mysql_obj->fetch_assoc($query);

            //redis缓存相应数据
            for ($i = 0; $i < count($fetch_array); $i++) {
                $redis_obj->zAdd($redis_key, $fetch_array[$i]['time'], $fetch_array[$i]['commentid']);
                $time_list[] = $fetch_array[$i]['commentid'];
            }

            //标记刷新缓存
            $redis_obj->set('cmt_list_time_flush' . $newsid, 1);
        } else {
            //从缓存中提取数据
            $time_list = $redis_obj->zRevRange($redis_key, $start, $end);
        }

        for ($i = 0; $i < count($time_list); $i++) {
            $return_list[] = CommentInfo::getCommentInfoById($time_list[$i]);
        }

        return $return_list;
    }

}
