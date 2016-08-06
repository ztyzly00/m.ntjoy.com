<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require_once __DIR__ . '/../Util/xunsearch/sdk/php/lib/XS.php';

$xs = new XS('ntjoy');

$index = $xs->index;
$search = $xs->search;

$search->setSort('chrono');
$search->setLimit(5,10);

print_r($search->search('南通'));
