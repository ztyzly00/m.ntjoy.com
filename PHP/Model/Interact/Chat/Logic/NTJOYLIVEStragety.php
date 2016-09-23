<?php

namespace Model\Interact\Chat\Logic;

class NTJOYLIVEStragety extends Stragety {

    public static function message($content) {
        $push_data = $content['data'];

        /* 暂时不显示内容 */
        $push_data = '暂不予显示内容';
        return $push_data;
    }

}
