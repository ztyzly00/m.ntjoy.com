<?php

/*
 * 评论列表类
 */

namespace Model\Comment;

use Core\MySql\Mysql_Model\XmMysqlObj;
use Core\Redis\RedisFactory;

class CommentList {

    /**
     * 按照赞的数目排序(去除redis缓存)
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

        //启用缓存需要把xx前缀去掉
        if (!$redis_obj->get('xx_cmt_list_upcount_flush' . $newsid)) {
            //一次刷新数量
            $mysql_count = 6;
            $xm_mysql_obj = XmMysqlObj::getInstance();

            $query = "select mncu.upcount,mncd.commentid from m_ntjoy_comment_detail mncd "
                    . "left join m_ntjoy_comment_upcount mncu on mncu.commentid=mncd.commentid "
                    . "where mncd.newsid=$newsid and status=1"
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
     * 按照時間排序，暂时不用redis缓存
     * @param type $newsid
     * @param type $offset
     * @param type $count
     * @return type
     */
    public static function getCommentListRangeByTime($newsid, $offset, $count) {
        $return_list = array();
        $time_list = array();
        $xm_mysql_obj = XmMysqlObj::getInstance();

        $query = "select commentid,time from m_ntjoy_comment_detail "
                . "where newsid=$newsid and status=1 "
                . "order by time desc "
                . "limit $offset,$count";

        $fetch_array = $xm_mysql_obj->fetch_assoc($query);

        for ($i = 0; $i < count($fetch_array); $i++) {
            $time_list[] = $fetch_array[$i]['commentid'];
        }

        for ($i = 0; $i < count($time_list); $i++) {
            $return_list[] = CommentInfo::getCommentInfoById($time_list[$i]);
        }

        return $return_list;
    }

}
