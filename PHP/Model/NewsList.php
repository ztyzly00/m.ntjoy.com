<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace Model;

use Model\NewsInfo;
use Core\MySql\Mysql_Model\MysqlObj;

class NewsList {

    public static function getNewsListByColumnId($column_id, $start, $offset) {

        $mysql_obj = MysqlObj::getInstance();
        $query = "select id from liv_contentmap where columnid=$column_id order by pubdate desc limit $start,$offset";
        $article_list_raw = $mysql_obj->fetch_assoc($query);
        $article_list = $article_list_raw;

        foreach ($article_list as $value) {
            foreach ($value as $id) {
                //$v是id的值
                $return_list[] = NewsInfo::getNewsInfoById($id);
            }
        }

        return $return_list;
    }

}
