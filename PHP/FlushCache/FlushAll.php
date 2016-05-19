<?php

/*
  仅仅作为紧急情况刷新
 */

$static_dir = __DIR__ . "/../../Page/static/";
$update_dir = __DIR__ . "/../UpdateHtml/";

$redis = new redis();
$redis->connect('127.0.0.1', 6379);
$redis->flushall();

exec("rm -f $static_dir" . "news*", $info);
exec("rm -f $static_dir" . "home*", $info);
exec("php $update_dir" . "UpdateHome.php", $info);

