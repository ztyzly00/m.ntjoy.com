<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require_once __DIR__ . '/../autoload.php';

use Model\Comment\CommentOpt;

$commentid = $_REQUEST['commentid'];

CommentOpt::addUpCount($commentid);
