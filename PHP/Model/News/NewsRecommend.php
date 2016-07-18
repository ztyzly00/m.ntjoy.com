<?php

namespace Model\News;

use Core\MySql\Mysql_Model;
use Core\Redis\RedisFactory;

/**
 * 新闻推荐类
 *
 * @author Zanuck
 */
class NewsRecommend {

    /**
     * 获取点击量最高新闻列表
     * @return type
     */
    public static function getHotNews() {

        $return_list = array();
        $news_list = array();
        $redis_obj = RedisFactory::createRedisInstance();
        $redis_key = 'hot_news_list';

        if (!$news_list = $redis_obj->lRange($redis_key, 0, -1)) {
            $mysql_obj = Mysql_Model\MysqlObj::getInstance();
            $crt_time = time();
            $yst_time = $crt_time - 86400;

            /* 获取最热新闻列表的id */
            $query = "select id from liv_contentmap lc "
                    . "left join liv_article la on lc.contentid=la.articleid "
                    . "where pubdate > $yst_time and la.video='' "
                    . "order by pointnum desc limit 3";
            $fetch_list = $mysql_obj->fetch_assoc($query);
            foreach ($fetch_list as $value) {
                foreach ($value as $id) {
                    $redis_obj->rpush($redis_key, $id);
                    $news_list[] = $id;
                }
            }
            $redis_obj->setTimeout($redis_key, 300);
        }

        /* 获取新闻信息 */
        foreach ($news_list as $id) {
            $return_list[] = NewsInfo::getNewsInfoById($id);
        }

        return $return_list;
    }

    /**
     * 获取点击量最高宽频列表
     * @return type
     */
    public static function getHotVideo() {

        $return_list = array();
        $video_list = array();
        $redis_obj = RedisFactory::createRedisInstance();
        $redis_key = 'hot_video_list';

        if (!$video_list = $redis_obj->lRange($redis_key, 0, -1)) {
            $kuanpin_id = 28;
            $mysql_obj = Mysql_Model\MysqlObj::getInstance();
            $query = "select colchilds from liv_column where columnid=$kuanpin_id limit 1";
            $fetch_array = $mysql_obj->fetch_assoc_one($query);

            $col_string = $fetch_array["colchilds"];
            $col_string = '(' . $col_string . ')';
            $crt_time = time();
            $yst_time = $crt_time - 86400;

            $query = "select id from liv_contentmap where pubdate > $yst_time and columnid in $col_string order by pointnum desc limit 3";
            $fetch_list = $mysql_obj->fetch_assoc($query);
            foreach ($fetch_list as $value) {
                foreach ($value as $id) {
                    $redis_obj->rpush($redis_key, $id);
                    $video_list[] = $id;
                }
            }
            $redis_obj->setTimeout($redis_key, 300);
        }

        /* 获取新闻信息 */
        foreach ($video_list as $id) {
            $return_list[] = NewsInfo::getNewsInfoById($id);
        }

        return $return_list;
    }

}
