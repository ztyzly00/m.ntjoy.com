<?php

require_once __DIR__ . '/../autoload.php';
require_once __DIR__ . '/../Util/xunsearch/sdk/php/lib/XS.php';

use Core\MySql\Mysql_Model\SearchMysqlObj;

$xs = new XS('news');
$index = $xs->index;

$index->clean();

$search_mysql_obj = SearchMysqlObj::getInstance();

$query = "select id from search_content order by id desc limit 1";
$fetch_list = $search_mysql_obj->fetch_assoc_one($query);
$id_max = $fetch_list['id'];


$loop_count = 1000;
$id_start = $id_max;
$array_count = $loop_count;

while ($id_start > $loop_count && $array_count == $loop_count) {

    $query = "SELECT
                    sc.id,
                    title,
                    strategy_id
            FROM
                    search_content sc
            LEFT JOIN search_href sh ON sh.contentid = sc.id
            WHERE
                    sc.id < $id_start
            ORDER BY
                    sc.id DESC
            LIMIT $loop_count";


    $fetch_array = $search_mysql_obj->fetch_assoc($query);
    $array_count = count($fetch_array);

    if ($array_count == $loop_count) {

        for ($i = 0; $i < $array_count; $i++) {

            $data = array(
                'newsid' => $fetch_array[$i]['id'],
                'title' => $fetch_array[$i]['title'],
                'strategyid' => $fetch_array[$i]['strategy_id']
            );
            $doc = new XSDocument;
            $doc->setFields($data);
            $index->update($doc);
        }

        $id_start = $fetch_array[$loop_count - 1]['id'];
        print_r($id_start . "\n");
    }
}


