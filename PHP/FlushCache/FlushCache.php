<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$dir = __DIR__ . "/../../Page/static/";
$redis = new redis();
$redis->connect('127.0.0.1', 6379);
$redis->flushall();
$fe = exec("rm -f $dir" . "news*", $info);
