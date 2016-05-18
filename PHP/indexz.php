<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require_once 'autoload.php';

use Core\MySql\Mysql_Model\MysqlObj;

$mysql_obj = MysqlObj::getInstance();

$query = "select * from liv_contentmap lc
LEFT JOIN liv_article la on lc.contentid=la.articleid
where columnid=359 ORDER BY pubdate desc limit 0,15;";

$return_array = $mysql_obj->fetch_assoc($query);
phpinfo();
//print_r($return_array);
