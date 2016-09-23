<?php

namespace Model\Interact\Chat\Logic;

/**
 * 消息推送策略接口
 */
interface IStragety {

    /**
     * 确认处理fd的位置
     */
    public static function confirm($fd, $content);

    /**
     * 处理数据
     */
    public static function message($content);
    
    /**
     * 获取fd的数组
     */
    public static function getFdArray($content);
}
