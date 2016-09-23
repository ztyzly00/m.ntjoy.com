<?php

namespace Model\Interact\Chat\Logic;

use Model\Interact\Chat\DataProcess;
use Core\Redis\RedisFactory;

class NTJOYLIVEStragety implements IStragety {

    public static function confirm($fd, $content) {
        $redis_obj = RedisFactory::createRedisInstance();
        $redis_key = DataProcess::GetRedisKey($content);
        $redis_obj->hSet($redis_key, $fd, $fd);
    }

    public static function getFdArray($content) {
        $redis_obj = RedisFactory::createRedisInstance();
        $redis_key = DataProcess::GetRedisKey($content);
        $return_array = $redis_obj->hGetAll($redis_key);
        return $return_array;
    }

    public static function message($content) {
        $push_data = '暂不予显示内容';
        return $push_data;
    }

}
