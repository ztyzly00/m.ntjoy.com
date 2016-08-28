<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require_once __DIR__ . '/../autoload.php';

print_r(Manager\CommentManager::getCommentListByTime(485141, 0, 4));
//print_r(Manager\CommentManager::getCommentListByUpCount(485141, 0, 4));
