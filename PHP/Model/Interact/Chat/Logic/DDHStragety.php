<?php

namespace Model\Interact\Chat\Logic;

use Core\Redis\RedisFactory;
use Core\MySql\Mysql_Model\XmMysqlObj;
use Model\Interact\Chat\DataProcess;

/**
 * 党代会消息推送策略
 */
class DDHStragety implements IStragety {

    public static function confirm($fd, $content) {
        $redis_obj = RedisFactory::createRedisInstance();
        $redis_key = DataProcess::GetRedisKey($content);
        $redis_obj->hSet($redis_key, $fd, $fd);
    }

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

    public static function getFdArray($content) {
        $redis_obj = RedisFactory::createRedisInstance();
        $redis_key = DataProcess::GetRedisKey($content);
        $return_array = $redis_obj->hGetAll($redis_key);
        return $return_array;
    }

}
