<?php

/**
 * 搜索引擎保持热度 后台运行
 */
while (1) {
    $res = file_get_contents('http://m.ntjoy.com/search.php?keyword=城市日历');
    sleep(5);
}
