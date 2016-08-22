<?php

$array = array('z', 't', 'y');

function test(&$array) {
    $array[1] = 'l';
}

test($array);

print_r($array);
