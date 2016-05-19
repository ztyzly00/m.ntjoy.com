<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$array = array(3, 704, 4, 5, 6, 7, 8, 483, 9, 1377, 10, 11, 12, 13, 14);


for ($i = 0; $i < count($array); $i++) {
    $url = "http://xm.ntwifi.cn/m.ntjoy.com/Page/home.php?columnid=$array[$i]";
    $hehe = file_get_contents($url);
    echo $url . "\n";
}
