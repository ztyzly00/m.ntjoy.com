<?php

namespace Model\News\Hot;

use Core\MySql\Mysql_Model\MysqlObj;
use Model\News\NewsInfo;

class HotNews {

    /**
     * 获取每日的热门新闻
     * @param type $column_id
     * @param type $date_string 当天0点的时间戳 !!
     * @return type
     */
    public static function getHotNews($column_id, $date_string) {

        $tom_date_string = $date_string + 86400;

        $mysql_obj = MysqlObj::getInstance();
        $query = "
                SELECT
                        id
                FROM
                        liv_contentmap
                WHERE
                        pubdate > $date_string
                AND pubdate < $tom_date_string
                AND columnid = $column_id";
        $hot_list = $mysql_obj->fetch_assoc($query);

        $return_array = array();
        foreach ($hot_list as $value) {
            $return_array[] = NewsInfo::getNewsInfoById($value['id']);
        }

        return $return_array;
    }

}
