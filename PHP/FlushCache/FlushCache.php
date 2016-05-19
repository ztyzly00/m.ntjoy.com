<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$dir = __DIR__ . "/../../Page/static/";

echo $dir;

exec("rm -f $dir.news*", $info);
