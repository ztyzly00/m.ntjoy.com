<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require_once __DIR__ . '/../autoload.php';

use Manager\CommentManager;

$newsid = $_POST['newsid'];
$offset = $_POST['offset'];
$count = $_POST['count'];


$array = CommentManager::getCommentListByTime($newsid, $offset, $count);

echo json_encode($array);
