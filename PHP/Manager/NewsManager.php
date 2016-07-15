<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace Manager;

use Model\News\NewsList;
use Model\News\NewsInfo;

class NewsManager {

    private static $_instance;

    /**
     * 获取本身对象的实例
     * @return type
     */
    public static function getInstance() {
        if (self::$_instance == NULL) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * 根据columnid返回新闻列表
     * @param type $columnid
     */
    public static function getNewsList($column_id, $count = 7) {
        return NewsList::getNewsListByColumnId($column_id, 0, $count);
    }

    /**
     * 根据id获取新闻内容
     * @param type $id
     */
    public static function getNewsContent($id) {
        return NewsInfo::getNewsInfoById($id);
    }

}
