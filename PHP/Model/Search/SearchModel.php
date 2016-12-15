<?php

/**
 * XunSearch搜索引擎方法
 *
 * @author Zanuck
 */

namespace Model\Search;

require_once __DIR__ . '/../../Util/xunsearch/sdk/php/lib/XS.php';

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
            $temp['id'] = $val->pid;
            $temp['title'] = $val->subject;
            $temp['pubdate'] = $val->chrono;
            $temp['pubdate'] = date("Y-m-d H:i:s", $temp['pubdate']);
            $temp['small_thumbfile_url'] = 'img/dianshitai.jpg';
            $return_array[] = $temp;
        }

       // $another_array = self::getSearchByWordFromAllNews($word, $count, $offset);
        //$return_array = array_merge($return_array, $another_array);

        return $return_array;
    }

    public static function getSearchByWordFromAllNews($word, $count, $offset) {
        $xs = new \XS('news');

        /* 获取搜索对象 */
        $search = $xs->search;

        /* 设置按照时间排序 */
        $search->setLimit($count, $offset);

        $search->setSort(array('strategyid' => true));

        $search_list = $search->search($word);

        $return_array = array();

        foreach ($search_list as $val) {
            $temp['id'] = $val->newsid;
            $temp['title'] = $val->title;
            $temp['strategyid'] = $val->strategyid;
            $return_array[] = $temp;
        }

        return $return_array;
    }

}
