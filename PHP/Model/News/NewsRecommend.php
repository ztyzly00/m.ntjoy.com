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
    public static function getHotNews($count) {

        $return_list = array();
        $news_list = array();
        $redis_obj = RedisFactory::createRedisInstance();
        $redis_key = 'hot_news_list';

        $news_list = $redis_obj->zRange($redis_key, 0, $count - 1);

        if (count($news_list) != $count) {
            $news_list = array();
            $mysql_obj = Mysql_Model\MysqlObj::getInstance();
            $crt_time = time();
            $yst_time = $crt_time - 86400;

            /* 获取最热新闻列表的id */
            $query = "select id from liv_contentmap lc "
                    . "left join liv_article la on lc.contentid=la.articleid "
                    . "where pubdate > $yst_time and la.video='' "
                    . "order by pointnum desc limit $count";
            $fetch_list = $mysql_obj->fetch_assoc($query);

            $index = 0;
            foreach ($fetch_list as $value) {
                foreach ($value as $id) {
                    $redis_obj->zAdd($redis_key, $index, $id);
                    $index++;
                    $news_list[] = $id;
                }
            }

            $redis_obj->setTimeout($redis_key, 500);
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
    public static function getHotVideo($count) {

        $return_list = array();
        $video_list = array();
        $redis_obj = RedisFactory::createRedisInstance();
        $redis_key = 'hot_video_list';

        $video_list = $redis_obj->zRange($redis_key, 0, $count - 1);

        /* 尽量用zset list会因为并发问题重复并且不能加锁 */
        if (count($video_list) != $count) {
            $video_list = array();
            $kuanpin_id = 28;
            $mysql_obj = Mysql_Model\MysqlObj::getInstance();
            $query = "select colchilds from liv_column where columnid=$kuanpin_id limit 1";
            $fetch_array = $mysql_obj->fetch_assoc_one($query);

            $col_string = $fetch_array["colchilds"];
            $col_string = '(' . $col_string . ')';
            $crt_time = time();
            $yst_time = $crt_time - 86400;

            $query = "select id from liv_contentmap where pubdate > $yst_time and columnid in $col_string order by pointnum desc limit $count";
            $fetch_list = $mysql_obj->fetch_assoc($query);

            $index = 0;
            foreach ($fetch_list as $value) {
                foreach ($value as $id) {
                    $redis_obj->zAdd($redis_key, $index, $id);
                    $index++;
                    $video_list[] = $id;
                }
            }

            $redis_obj->setTimeout($redis_key, 500);
        }

        /* 获取新闻信息 */
        foreach ($video_list as $id) {
            $return_list[] = NewsInfo::getNewsInfoById($id);
        }

        return $return_list;
    }

    /**
     * 获取点击量最高图片列表
     * @return type
     */
    public static function getHotImg($count) {

        $return_list = array();
        $img_list = array();
        $redis_obj = RedisFactory::createRedisInstance();
        $redis_key = 'hot_img_list';

        $img_list = $redis_obj->zRange($redis_key, 0, $count - 1);

        if (count($img_list) != $count) {
            $img_list = array();
            $img_id = 15;
            $mysql_obj = Mysql_Model\MysqlObj::getInstance();
            $query = "select colchilds from liv_column where columnid=$img_id limit 1";
            $fetch_array = $mysql_obj->fetch_assoc_one($query);

            $col_string = $fetch_array["colchilds"];
            $col_string = '(' . $col_string . ')';
            $crt_time = time();
            $yst_time = $crt_time - (86400 * 4);

            $query = "select id from liv_contentmap where pubdate > $yst_time and columnid in $col_string order by pointnum desc limit $count";
            $fetch_list = $mysql_obj->fetch_assoc($query);

            $index = 0;
            foreach ($fetch_list as $value) {
                foreach ($value as $id) {
                    $redis_obj->zAdd($redis_key, $index, $id);
                    $index++;
                    $img_list[] = $id;
                }
            }

            $redis_obj->setTimeout($redis_key, 500);
        }

        /* 获取新闻信息 */
        foreach ($img_list as $id) {
            $return_list[] = NewsInfo::getNewsInfoById($id);
        }

        return $return_list;
    }

}
