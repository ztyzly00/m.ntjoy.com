<?php

namespace Model\Other\Ddh;

use Core\MySql\Mysql_Model\XmMysqlObj;

class DdhForm {

    /**
     * 插入动态文本
     * @param type $content 文本内容
     */
    public static function InsertContent($content) {
        $mysql_obj = XmMysqlObj::getInstance();
        $time = time();
        $query = "insert into ddh_content(`content`,`time`) values ('$content',$time)";
        $mysql_obj->exec_query($query);
    }

    /**
     * 获取最新动态的内容
     * @param type $count
     * @return type
     */
    public static function getContent($count) {
        $mysql_obj = XmMysqlObj::getInstance();
        $query = "select * from ddh_content order by time desc limit $count";
        $return_array = $mysql_obj->fetch_assoc($query);
        for ($i = 0; $i < count($return_array); $i++) {
            $return_array[$i]['time'] = date("Y-m-d H:i:s", $return_array[$i]['time']);
        }
        return $return_array;
    }

}
