<?php

namespace Model\Interact\Chat\Logic;

use Core\Redis\RedisFactory;
use Model\Interact\Chat\DataProcess;

/**
 * 消息推送策略接口
 */
abstract class Stragety {

    /**
     * 确认处理fd的位置
     */
    public static function confirm($fd, $content) {
        $redis_obj = RedisFactory::createRedisInstance();
        $redis_key = DataProcess::GetRedisKey($content);
        $redis_obj->hSet($redis_key, $fd, $fd);
    }

    /**
     * 处理数据
     */
    public static function message($content) {
        
    }

    /**
     * 获取fd的数组
     */
    public static function getFdArray($content) {
        $redis_obj = RedisFactory::createRedisInstance();
        $redis_key = DataProcess::GetRedisKey($content);
        $return_array = $redis_obj->hGetAll($redis_key);
        return $return_array;
    }

}
