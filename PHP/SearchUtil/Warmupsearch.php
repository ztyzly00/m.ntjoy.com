<?php

/**
 * 搜索引擎保持热度 后台运行
 */
set_time_limit(0);
ignore_user_abort(true);

$warm_array = array('城市日历', '南通', '领导');

$ch = curl_init();

while (TRUE) {
    for ($i = 0; $i < count($warm_array); $i++) {
        curl_setopt($ch, CURLOPT_URL, "http://m.ntjoy.com/search.php?keyword=$warm_array[$i]");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 3);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        $output = curl_exec($ch);
        sleep(5);
    }
}
