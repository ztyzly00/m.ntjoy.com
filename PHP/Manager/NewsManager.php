<?php

/*
 * 管理类，之所以设置管理类，保证管理类对外的API绝对不会变动
 * 方便后期model方法参数的更改
 */

namespace Manager;

use Model\News\NewsList;
use Model\News\NewsInfo;
use Model\News;

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

    /**
     * 获取点击量最高新闻列表
     * @return type
     */
    public static function getHotNews() {
        return News\NewsRecommend::getRecommend(3, 'news');
    }

    /**
     * 获取点击量最高宽频列表
     * @return type
     */
    public static function getHotVideo() {
        return News\NewsRecommend::getRecommend(3, 'video');
    }

    /**
     * 获取点击量最高图片
     * @return type
     */
    public static function getHotImg() {
        return News\NewsRecommend::getRecommend(4, 'img');
    }

}
