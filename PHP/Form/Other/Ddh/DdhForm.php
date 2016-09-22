<?php

require_once __DIR__ . '/../../../autoload.php';

use Model\Other\Ddh\DdhForm;

$content = $_REQUEST['content'];

DdhForm::InsertContent($content);

echo "成功插入";
