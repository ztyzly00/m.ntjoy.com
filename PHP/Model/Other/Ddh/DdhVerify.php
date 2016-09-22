<?php

namespace Model\Other\Ddh;

use Core\MySql\Mysql_Model\XmMysqlObj;

/**
 * 党代会相关操作类
 */
class DdhVerify {

    /**
     * 获取党代会没有经过审核的互动内容
     * @return type
     */
    public static function getContent() {
        $mysql_obj = XmMysqlObj::getInstance();
        $query = "select * from ddh_chat where is_show=0 order by time desc";
        return $mysql_obj->fetch_assoc($query);
    }

    
}
