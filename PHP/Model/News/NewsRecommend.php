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
     * 获取推荐新闻
     * @param type $count 获取的数目
     * @param type $classify 获取的
     */
    public static function getRecommend($count, $classify) {
        $return_list = array();

        /* 设置随机取数范围 */
        $range_count = $count * 4;

        $redis_obj = RedisFactory::createRedisInstance();
        $redis_key = self::getRedisKey($classify);

        $list = $redis_obj->zRange($redis_key, 0, $range_count - 1);

        /* 若缓存条件不满足，从mysql取相应数据 */
        if (count($list) != $range_count) {
            $mysql_obj = Mysql_Model\MysqlObj::getInstance();
            $list = array();

            $query = self::getMysqlQuery($range_count, $classify);
            $fetch_list = $mysql_obj->fetch_assoc($query);

            /* 获取id数组并缓存 */
            $index = 0;
            foreach ($fetch_list as $value) {
                foreach ($value as $id) {
                    $redis_obj->zAdd($redis_key, $index, $id);
                    $index++;
                    $list[] = $id;
                }
            }
            /* 设置缓存超时时间 */
            $redis_obj->setTimeout($redis_key, 500);
        }

        $list = self::rangeList($list, $count);

        foreach ($list as $id) {
            $return_list[] = NewsInfo::getNewsInfoById($id);
        }

        return $return_list;
    }

    /**
     * 获取redis键名
     * @param type $classify
     * @return string
     */
    public static function getRedisKey($classify) {
        $redis_key = '';

        if ($classify == 'news') {
            $redis_key = 'hot_news_list';
        } else if ($classify == 'img') {
            $redis_key = 'hot_img_list';
        } else if ($classify == 'video') {
            $redis_key = 'hot_video_list';
        }
        return $redis_key;
    }

    /**
     * 从list中随机获取数量为$count的数组
     * @param type $list
     * @param type $count
     */
    public static function rangeList($list, $count) {
        $list_num = array_rand($list, $count);
        for ($i = 0; $i < count($list_num); $i++) {
            $return_list[] = $list[$list_num[$i]];
        }
        return $return_list;
    }

    /**
     * 获取mysql query语句
     * @param type $count
     */
    public static function getMysqlQuery($count, $classify) {
        $query = '';
        if ($classify == 'news') {
            $crt_time = time();
            $yst_time = $crt_time - 86400;
            $query = "select id from liv_contentmap lc "
                    . "left join liv_article la on lc.contentid=la.articleid "
                    . "where pubdate > $yst_time and la.video='' "
                    . "order by pointnum desc limit $count";
        } else if ($classify == 'img') {
            $img_id = 15;
            $mysql_obj = Mysql_Model\MysqlObj::getInstance();
            $query = "select colchilds from liv_column "
                    . "where columnid=$img_id limit 1";
            $fetch_array = $mysql_obj->fetch_assoc_one($query);
            $col_string = $fetch_array["colchilds"];
            $col_string = '(' . $col_string . ')';
            $crt_time = time();
            $yst_time = $crt_time - (86400 * 4 * 4);
            $query = "select id from liv_contentmap "
                    . "where pubdate > $yst_time and columnid in $col_string "
                    . "order by pointnum desc limit $count";
        } else if ($classify == 'video') {
            $kuanpin_id = 28;
            $mysql_obj = Mysql_Model\MysqlObj::getInstance();
            $query = "select colchilds from liv_column "
                    . "where columnid=$kuanpin_id limit 1";
            $fetch_array = $mysql_obj->fetch_assoc_one($query);
            $col_string = $fetch_array["colchilds"];
            $col_string = '(' . $col_string . ')';
            $crt_time = time();
            $yst_time = $crt_time - 86400;
            $query = "select id from liv_contentmap "
                    . "where pubdate > $yst_time and columnid in $col_string "
                    . "order by pointnum desc limit $count";
        }

        return $query;
    }

}
