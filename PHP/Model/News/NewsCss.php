<?php

/**
 * NewsInfo实例对象  新闻单例
 */

namespace Model\News;

class NewsCss {

    /**
     * 改变文章css属性，使的适应lazyload延时加载
     */
    public static function ModifyContentImgCss($array) {
        $array['content'] = str_replace("src", "data-original", $array['content']);
        return $array;
    }

    /**
     * 改变文章css属性，使lazyload失效
     * @param array $array
     * @return type
     */
    public static function CancelContentImgCss(&$array) {
        $array['content'] = str_replace("data-original", "src", $array['content']);
        return $array;
    }

}
