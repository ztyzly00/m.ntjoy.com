<?php

require_once __DIR__ . '/../autoload.php';

use Core\MySql\Mysql_Model\XmMysqlObj;

$xm_mysql_obj = XmMysqlObj::getInstance();

$commentid = $_POST['commentid'];

$query = "update m_ntjoy_comment_detail set status=1 where commentid='$commentid'";

$xm_mysql_obj->exec_query($query);
