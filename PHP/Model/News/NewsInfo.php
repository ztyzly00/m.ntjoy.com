<?php

/**
 * NewsInfo实例对象  新闻单例
 */

namespace Model\News;

use Config\WebConfig;
use Core\MySql\Mysql_Model;
use Core\Redis\RedisFactory;
use Model\News\NewsModify;

class NewsInfo {

    /**
     * 需要性能优化，除了缓存，调用方法尽量以静态为准
     * (因是迫不得已为了框架性大量循环，所以加入redis缓存)
     * 获取单新闻内容信息,根据liv_contentmap中的唯一id
     * @param type $article_id 文章id
     * @param type $column_id 栏目id
     */
    public static function getNewsInfoById($id) {

        $redis_obj = RedisFactory::createRedisInstance();
        $redis_key = 'newsinfo_' . $id;

        if (WebConfig::$cache) {
            $return_array = $redis_obj->hGetAll($redis_key);
        } else {
            $return_array = [];
        }

        if (!$return_array) {
            /* 缓存未命中 */
            $mysql_obj = Mysql_Model\MysqlObj::getInstance();
            $query = "select "
                    . "lc.*,lac.content,la.*,lm.*,lcol.colname,lc.columnid,lv.name "
                    . "from liv_contentmap lc "
                    . "left join liv_article_contentbody lac on lac.articleid=lc.contentid "
                    . "LEFT JOIN liv_article la on lc.contentid=la.articleid "
                    . "left join liv_material lm on la.loadfile=lm.materialid "
                    . "left join liv_column lcol on lc.columnid=lcol.columnid "
                    . "left join liv_user lv on lv.userid=lc.userid "
                    . "WHERE lc.id=$id limit 1";

            /* 处理数据 */
            $return_array = NewsModify::processNewsInfo($mysql_obj->fetch_assoc($query));

            if (WebConfig::$cache) {
                $redis_obj->hMset($redis_key, $return_array);
                $redis_obj->setTimeout($redis_key, 3600);
            }
        }

        return $return_array;
    }

}
