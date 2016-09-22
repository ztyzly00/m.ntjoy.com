<?php

require_once __DIR__ . '/../../../autoload.php';

use Model\Other\Ddh\DdhVerify;

$id = $_REQUEST['id'];
$opt = $_REQUEST['opt'];

if ($opt == 'pass') {
    DdhVerify::chageShow($id);
}

