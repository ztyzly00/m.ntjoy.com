<?php

namespace Model\News\Hot;

use Model\News\NewsList;
use Model\News\NewsCss;

class HotNews {

    public static function getHotNews($column_id) {

        $news_list = NewsList::getNewsListByColumnId($column_id, 0, 7);

        for ($i = 0; $i < count($news_list); $i++) {
            NewsCss::CancelContentImgCss($news_list[$i]);
        }

        return $news_list;
    }

}
