<?php

namespace Model\Interact\Chat;

use Core\Redis\RedisFactory;

class DataProcess {

    public static function pushData($server, $frame) {

        /* 获取数据并转换为数组 */
        $data = json_decode($frame->data);
        $data = (array) $data;

        if (!self::IsLegal($data)) {
            return;
        }

        $header = $data['header'];
        $content = (array) $data['content'];

        /* 设置fd推送数组的映射从属关系 */
        self::setFdMap($frame->fd, $content);

        /* 获取调用策略名称 */
        $strategy_class = self::getStrategy($content['classify']);

        /* 初始化推送内容 */
        $push_data = '';

        /* 获取推送的数组 */
        $push_array = array();
        $push_array = self::getFdArray($content);

        /* 判断消息来源：做相应处理 */
        switch ($header) {
            case 'confirm':
                call_user_func(array($strategy_class, 'confirm')
                        , $frame->fd, $content);
                break;
            case 'message':
                $push_data = call_user_func(array($strategy_class, 'message')
                        , $content);
                break;
            default :
                break;
        }

        /* 如果消息不为空就推送消息 */
        if ($push_data) {
            foreach ($push_array as $fd) {
                if (!$server->push($fd, $push_data)) {
                    self::delFd($fd);
                }
            }
        }
    }

    /**
     * 建立fd和推送数组的映射
     * @param type $fd
     * @param type $content
     */
    public static function setFdMap($fd, $content) {
        $redis_obj = RedisFactory::createRedisInstance();
        $map_redis_key = self::GetRedisKey($content);
        $redis_key = 'fd_map';
        $redis_obj->hSet($redis_key, $fd, $map_redis_key);
    }

    /**
     * 从推送相应推送数组中删除退出的fd
     * @param type $fd
     */
    public static function delFd($fd) {
        $redis_obj = RedisFactory::createRedisInstance();
        $redis_key = 'fd_map';
        $map_redis_key = $redis_obj->hGet($redis_key, $fd);
        $redis_obj->hDel($map_redis_key, $fd);
        $redis_obj->hDel($redis_key, $fd);
    }

    /**
     * 获取redis的键值
     * @param type $content
     * @return string
     */
    public static function GetRedisKey($content) {
        $classify = $content['classify'];
        $redis_key = $classify . '_fd_list';
        return $redis_key;
    }

    /**
     * 判断数据是否合法 合法返回1 不合法返回0
     * @param type $data
     */
    public static function IsLegal($data) {
        $count = count($data);
        if ($count < 2) {
            return 0;
        }
        if (!array_key_exists('header', $data) || !array_key_exists('content', $data)) {
            return 0;
        }
        return 1;
    }

    /**
     * 获取推送数组
     * @param type $content
     * @return type
     */
    public static function getFdArray($content) {
        $strategy_class = self::getStrategy($content['classify']);
        return call_user_func(array($strategy_class, 'getFdArray'), $content);
    }

    /**
     * 获取策略名称
     * @param type $strategy_name
     * @return type
     */
    public static function getStrategy($strategy_name) {
        $strategy_name = strtoupper($strategy_name);
        return "Model\\Interact\\Chat\\Logic\\" . $strategy_name . 'Stragety';
    }

}
