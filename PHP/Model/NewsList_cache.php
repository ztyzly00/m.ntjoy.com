<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace Model;

use Model\NewsInfo;
use Core\MySql\Mysql_Model\MysqlObj;
use Core\Redis\RedisFactory;

class NewsListCache {

    public static function getNewsListByColumnId($column_id, $start, $offset) {

        $redis_obj = RedisFactory::createRedisInstance();
        //缓存数组的名字
        $redis_list_name = 'newslist_s' . $start . '_o' . $offset . '_c' . $column_id;

        //qq未命中缓存
        if (!$return_list = $redis_obj->lgetrange($redis_list_name, 0, -1)) {
            $mysql_obj = MysqlObj::getInstance();
            $query = "select id from liv_contentmap where columnid=$column_id order by pubdate desc limit $start,$offset";
            $article_list_raw = $mysql_obj->fetch_assoc($query);
            $article_list = $article_list_raw;

            foreach ($article_list as $value) {
                foreach ($value as $id) {
                    $redis_obj->lpush($redis_list_name, $id);
                    //$v是id的值
                    $return_list[] = NewsInfo::getNewsInfoById($id);
                }
            }
        } else {
            //命中缓存
            for ($i = 0; $i < $redis_obj->lsize($redis_list_name); $i++) {
                $return_list[] = NewsInfo::getNewsInfoById($redis_obj->lget($redis_list_name, $i));
            }
            $redis_obj->del($redis_list_name);
        }


        // print_r($return_list);
        return $return_list;
    }

}
