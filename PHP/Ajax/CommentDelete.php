<?php

require_once __DIR__ . '/../autoload.php';

use Core\MySql\Mysql_Model\XmMysqlObj;

$xm_mysql_obj = XmMysqlObj::getInstance();

$commentid = $_REQUEST['commentid'];

$query = "delete from m_ntjoy_comment_detail where commentid='$commentid'";

$xm_mysql_obj->exec_query($query);
