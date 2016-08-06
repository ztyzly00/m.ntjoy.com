<?php

require_once __DIR__ . '/../autoload.php';
require_once __DIR__ . '/../Util/xunsearch/sdk/php/lib/XS.php';

use Core\MySql\Mysql_Model;

$xs = new XS('ntjoy');
$index = $xs->index;

$ntjoy_mysql_obj = Mysql_Model\MysqlObj::getInstance();
$query = "select id from liv_contentmap order by id desc limit 1";
$fetch_list = $ntjoy_mysql_obj->fetch_assoc_one($query);
$id_max = $fetch_list['id'];

$loop_count = 1000;
$id_start = $id_max;
$array_count = $loop_count;

while ($id_start > $loop_count && $array_count == $loop_count) {

    $query = "select "
            . "lc.id,la.title,lc.pubdate "
            . "from liv_contentmap lc "
            . "LEFT JOIN liv_article la on lc.contentid=la.articleid "
            . "where lc.id<$id_start and lc.`STATUS`=3 and lc.modeid=1 and lc.linktype=1 and lc.siteid=1 "
            . "order by lc.id desc "
            . "limit $loop_count";

    $fetch_array = $ntjoy_mysql_obj->fetch_assoc($query);
    $array_count = count($fetch_array);

    if ($array_count == $loop_count) {

        for ($i = 0; $i < $array_count; $i++) {
 
            $data = array(
                'pid' => $fetch_array[$i]['id'], // 此字段为主键，必须指定
                'subject' => $fetch_array[$i]['title'],
                'chrono' => $fetch_array[$i]['pubdate']
            );
            $doc = new XSDocument;
            $doc->setFields($data);
            $index->update($doc);
        }

        $id_start = $fetch_array[$loop_count - 1]['id'];
        print_r($id_start . "\n");
    }
}


