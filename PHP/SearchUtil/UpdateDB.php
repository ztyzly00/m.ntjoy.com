<?php

/**
 * 每5分钟执行的脚本，拉入最新的100条数据到搜索引擎数据库
 */
require_once __DIR__ . '/../autoload.php';
require_once __DIR__ . '/../Util/xunsearch/sdk/php/lib/XS.php';

use Core\MySql\Mysql_Model;

$xs = new XS('ntjoy');
$index = $xs->index;

$ntjoy_mysql_obj = Mysql_Model\MysqlObj::getInstance();

$query = "
        SELECT
            lc.id,
            la.title,
            lc.pubdate
        FROM
                liv_contentmap lc
        LEFT JOIN liv_article la ON lc.contentid = la.articleid
        where lc.`STATUS` = 3
        AND lc.modeid = 1
        AND lc.linktype = 1
        AND lc.siteid = 1
        ORDER BY
                lc.pubdate DESC
        LIMIT 100";

$fetch_array = $ntjoy_mysql_obj->fetch_assoc($query);

for ($i = 0; $i < count($fetch_array); $i++) {

    $data = array(
        'pid' => $fetch_array[$i]['id'],
        'subject' => $fetch_array[$i]['title'],
        'chrono' => $fetch_array[$i]['pubdate']
    );

    $doc = new XSDocument;
    $doc->setFields($data);
    $index->update($doc);
}