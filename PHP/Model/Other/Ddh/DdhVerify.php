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

    /**
     * 改变数据显示状态
     * @param type $id
     */
    public static function chageShow($id) {
        $mysql_obj = XmMysqlObj::getInstance();
        $query = "update ddh_chat set is_show=1 where id=$id";
        $mysql_obj->exec_query($query);        
    }

    /**
     * 删除相应id的数据
     * @param type $id
     */
    public static function deleteContent($id) {
        $mysql_obj = XmMysqlObj::getInstance();
        $query = "delete from ddh_chat where id=$id";
        $mysql_obj->exec_query($query);
    }

}
