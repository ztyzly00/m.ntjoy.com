<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace Model\News;

use Model\News\NewsInfo;
use Core\MySql\Mysql_Model\MysqlObj;
use Core\Redis\RedisFactory;

class NewsList {

    /**
     * 根据参数获取新闻内容列表
     * @param type $column_id
     * @param type $offset
     * @param type $count
     * @return type
     */
    public static function getNewsListByColumnId($column_id, $offset, $count) {
        $redis_obj = RedisFactory::createRedisInstance();

        //超出缓存范围将如何处理,暂不做处理，没人会看这么多的新闻，人数多了在考虑
        //未击中缓存，后续有需求才用到，暂时不需要缓存击中
        if (!$news_list = $redis_obj->lRange('news_list' . $column_id, $offset, $offset + $count - 1)) {
            $mysql_obj = MysqlObj::getInstance();
            $query = "select id from liv_contentmap lc "
                    . "left join liv_article la on lc.contentid=la.articleid "
                    . "where lc.columnid=$column_id and la.liv_outlink='' and lc.status!=6 "
                    . "order by lc.pubdate desc limit $offset,$count";
            $article_list_raw = $mysql_obj->fetch_assoc($query);
            $article_list = $article_list_raw;
            foreach ($article_list as $value) {
                foreach ($value as $id) {
                    $redis_obj->rpush('news_list' . $column_id, $id);
                    $news_list[] = $id;
                }
            }
        }

        //从新闻列表读取唯一id，获取真正的新闻
        foreach ($news_list as $id) {
            $return_list[] = NewsInfo::getNewsInfoById($id);
        }

        return $return_list;
    }

    /**
     * 向redis缓存中更新新闻列表
     * @param type $count 更新的新闻条数 默认每个栏目50条新闻
     */
    public static function updateColumnList($column_id, $count = 100) {
        $redis_obj = RedisFactory::createRedisInstance();
        $mysql_obj = MysqlObj::getInstance();
        $query = "select id from liv_contentmap lc "
                . "left join liv_article la on lc.contentid=la.articleid "
                . "where lc.columnid=$column_id and la.liv_outlink=''  and lc.status!=6 "
                . "order by lc.pubdate desc limit 0,$count";
        $article_list_raw = $mysql_obj->fetch_assoc($query);
        $article_list = $article_list_raw;

        foreach ($article_list as $value) {
            foreach ($value as $id) {
                echo $id . "\n";
                $redis_obj->rpush('news_list' . $column_id, $id);
            }
        }
    }

}
