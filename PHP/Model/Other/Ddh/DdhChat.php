<?php

namespace Model\Other\Ddh;

use Core\MySql\Mysql_Model\XmMysqlObj;

class DdhChat {

    public static function getChatContent($count) {
        $mysql_obj = XmMysqlObj::getInstance();
        $query = "select * from ddh_chat where is_show=1 order by time desc limit $count";
        return array_reverse($mysql_obj->fetch_array($query));
    }

}
