<?php

namespace Model\Interact\Chat\Logic;

use Core\MySql\Mysql_Model\XmMysqlObj;

/**
 * 党代会消息推送策略
 */
class DDHStragety extends Stragety {

    public static function message($content) {
        $return_data = '';
        if (array_key_exists('password', $content)) {
            /* 带密码消息，用以推送 */
            if ($content['password'] == 'zhentianyu28') {
                $return_data = $content['data'];
            } else {
                return 0;
            }
        } else {
            /* 不带密码消息，用以审核 */
            $mysql_obj = XmMysqlObj::getInstance();
            $time = time();
            $push_data = $content['data'];
            $query = "
                INSERT INTO ddh_chat (`content`, `time`,`is_show`)
                VALUES
                        ('$push_data', $time,0)";
            $mysql_obj->exec_query($query);
            return 0;
        }

        return $return_data;
    }

}
