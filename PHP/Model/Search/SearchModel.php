<?php

/**
 * XunSearch搜索引擎方法
 *
 * @author Zanuck
 */

namespace Model\Search;

require_once __DIR__ . '/../../Util/xunsearch/sdk/php/lib/XS.php';

use Model\News\NewsInfo;

class SearchModel {

    /**
     * 获取关键字搜索结果，按照时间排序
     * @param type $word
     * @param type $count
     * @param type $offset
     */
    public static function getSearchByWord($word, $count, $offset) {
        $xs = new \XS('ntjoy');

        /* 获取搜索对象 */
        $search = $xs->search;

        /* 设置按照时间排序 */
        $search->setSort('chrono');
        $search->setLimit($count, $offset);

        $search_list = $search->search($word);

        $return_array = array();
        foreach ($search_list as $val) {
            $return_array[] = NewsInfo::getNewsInfoById($val->pid);
        }

        print_r($return_array);
    }

}
