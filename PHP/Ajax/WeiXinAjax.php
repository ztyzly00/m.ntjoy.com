<?php

require_once __DIR__ . '/../autoload.php';

use Model\WeiXin\JSSDK;

$cr_link = $_GET['cr_link'];

$jssdk = new JSSDK("wxb99f3642ee73bcbd", "672f9054819bcd88d576cf59c591e0a9", $cr_link);

$signPackage = $jssdk->GetSignPackage();

$return_json = json_encode($signPackage);

echo $return_json;
