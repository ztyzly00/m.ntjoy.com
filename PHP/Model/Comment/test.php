<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


require_once __DIR__ . '/../../autoload.php';

use Model\Comment\CommentInfo;
use Model\Comment\CommentList;
use Model\Comment\CommentOpt;
use Core\Redis\RedisFactory;
use Core\MySql\Mysql_Model\XmMysqlObj;

$array['userid'] = "random";
$array['newsid'] = 1155522;
$array['touserid'] = 'ffff';
$array['comment'] = 'fffffffffffffffffffff';

//CommentOpt::insertComment($array);

CommentList::getCommentListRangeByUpCount(1155522, 0, 7);

//CommentOpt::addUpCount('57403ee45c303');

//$string = CommentInfo::getCommentInfoById(1);

//$string = uniqid();

//print_r($string);


