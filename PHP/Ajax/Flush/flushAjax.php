<?php

$pass = $_REQUEST['pass'];

if ($pass == 'ntjoy8410') {
    exec("php /opt/web/xm.ntwifi.cn/m.ntjoy.com/FlushCache/FlushAll.php > /dev/null &", $info);
    echo "正在刷新，一分钟内请勿再次刷新！";
} else {
    echo "密码错误";
}

