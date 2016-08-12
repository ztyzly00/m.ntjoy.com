<?php

namespace Model\Comment;

use Core\MySql\Mysql_Model\XmMysqlObj;
use Core\MySql\Mysql_Model\MysqlObj;

/**
 * 评论维护类
 *
 * @author Zanuck
 */
class CommentVerify {

    public static function getCmtListUnVf() {
        $xm_mysql_obj = XmMysqlObj::getInstance();
        $mysql_obj = MysqlObj::getInstance();

        $query = "select * from m_ntjoy_comment_detail mncd "
                . "where status=0 order by time DESC";
        $cmt_list = $xm_mysql_obj->fetch_assoc($query);

        for ($i = 0; $i < count($cmt_list); $i++) {
            $news_id = $cmt_list[$i]['newsid'];

            $query = "select * from liv_contentmap "
                    . "LEFT JOIN liv_article on liv_article.articleid=liv_contentmap.contentid "
                    . "where liv_contentmap.id=$news_id limit 1";

            $list = $mysql_obj->fetch_assoc_one($query);
            $cmt_list[$i]['title'] = $list['title'];
        }

        return $cmt_list;
    }

}
