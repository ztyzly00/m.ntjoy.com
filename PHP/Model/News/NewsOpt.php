<?php

/**
 * NewsOpt,新闻相关操作类
 */

namespace Model\News;

use Core\MySql\Mysql_Model\MysqlObj;

class NewsOpt {

    /**
     * 根据新闻id增加该片文章的点击率
     * @param type $id
     */
    public static function addPoint($id) {
        $mysql_obj = MysqlObj::getInstance();
        $query = "
            UPDATE liv_contentmap
            SET pointnum = pointnum + 1
            WHERE
                    id = $id";
        $mysql_obj->exec_query($query);
    }

}
