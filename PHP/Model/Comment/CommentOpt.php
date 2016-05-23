<?php

/*
 * 操作评论类
 */

namespace Model\Comment;

use Core\MySql\Mysql_Model\XmMysqlObj;
use Core\Redis\RedisFactory;
use Model\WebUtils\WebUtils;
use Model\Comment\CommentInfo;

class CommentOpt {

    /**
     * 向数据库中插入评论内容
     * @param type $cmt_array 评论内容数组
     */
    public static function insertComment($cmt_array) {

        $xm_mysql_obj = XmMysqlObj::getInstance();
        $redis_obj = RedisFactory::createRedisInstance();

        //采用唯一键值，能更好的利用redis
        $commentid = uniqid();
        $cmt_array['commentid'] = $commentid;
        $userid = $cmt_array['userid'];
        $newsid = $cmt_array['newsid'];
        $tocommentid = $cmt_array['tocommentid'];
        $comment = $cmt_array['comment'];
        //获取ip地址
        $ip = WebUtils::getIp();
        //获取当前时间
        $time = time();
        $cmt_array['ip'] = $ip;
        $cmt_array['time'] = $time;
        //赞的初始值为0
        $upcount = 0;

        //将数据插入数据库
        $query = "insert into m_ntjoy_comment_detail (`commentid`,`userid`,`newsid`,`tocommentid`,`comment`,`ip`,`time`) "
                . "values ('$commentid','$userid','$newsid','$tocommentid','$comment','$ip','$time')";
        $xm_mysql_obj->exec_query($query);

        /**
         * 将评论数据插入redis排序列表        
         */
        //点赞数排序
        $redis_key = 'news_comment_range_upcount_' . $newsid;
        $redis_obj->zAdd($redis_key, $upcount, $commentid);
        //时间排序
        $redis_key = 'news_comment_range_time_' . $newsid;
        $redis_obj->zAdd($redis_key, $time, $commentid);

        /**
         * 将赞的数据插入数据库
         * 赞的初始值为0
         */
        $query = "insert into m_ntjoy_comment_upcount (`commentid`,`upcount`) values ('$commentid','$upcount')";
        $xm_mysql_obj->exec_query($query);
        $redis_key = 'comment_upcount_' . $commentid;
        $redis_obj->set($redis_key, $upcount);

        /**
         * 更新新闻的评论数数据库，若用myisam数据库引擎没有必要，innodb select count（*） 会进行全表扫描，所以需要另外计数
         */
        $query = "select * from m_ntjoy_news_comment_count where newsid=$newsid";
        if (!$xm_mysql_obj->num_rows($query)) {
            //插入新数据
            $query = "insert into m_ntjoy_news_comment_count (`newsid`,`commentcount`) values ($newsid,1)";
        } else {
            //更新数据
            $query = "update m_ntjoy_news_comment_count set commentcount=commentcount+1 where newsid=$newsid";
        }
        $xm_mysql_obj->exec_query($query);

        //更新redis中的值
        $redis_key = 'comment_count_' . $newsid;
        if ($redis_obj->exists($redis_key)) {
            $comment_count = $redis_obj->get($redis_key);
            $redis_obj->set($redis_key, $comment_count + 1);
        }
    }

    /**
     * 给相应的评论点赞
     * @param type $commentid
     */
    public static function addUpCount($commentid) {
        self::addUpCountForRedis($commentid);
        self::addUpCountForMysql($commentid);
    }

    /**
     * 给相应的评论增加赞的个数，往数据库插入
     * @param type $commentid
     */
    public static function addUpCountForMysql($commentid) {
        $xm_mysql_obj = XmMysqlObj::getInstance();
        $query = "update m_ntjoy_comment_upcount set upcount=upcount+1 where commentid='$commentid'";
        $xm_mysql_obj->exec_query($query);
    }

    /**
     * 给相应的评论增加赞的个数，修改redis
     * @param type $commentid
     */
    public static function addUpCountForRedis($commentid) {
        $xm_mysql_obj = XmMysqlObj::getInstance();
        $redis_obj = RedisFactory::createRedisInstance();
        $redis_key = 'comment_upcount_' . $commentid;
        if (!$redis_obj->exists($redis_key)) {
            $query = "select upcount from m_ntjoy_comment_upcount where commentid='$commentid'";
            $fetch_array = $xm_mysql_obj->fetch_assoc($query);
            $upcount = $fetch_array[0]['upcount'] + 1;
            $redis_obj->set($redis_key, $upcount);
        } else {
            $upcount = $redis_obj->get($redis_key) + 1;
            $redis_obj->set($redis_key, $upcount);
        }

        //更新排序表
        $comment_info = CommentInfo::getCommentInfoById($commentid);
        $newsid = $comment_info['newsid'];
        $redis_key = 'news_comment_range_upcount_' . $newsid;
        $redis_obj->zAdd($redis_key, $upcount, $commentid);
    }

}
