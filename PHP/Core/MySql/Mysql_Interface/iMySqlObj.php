<?php

namespace Core\MySql\Mysql_Interface;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

interface iMySqlObj {

    /**
     * 返回结果集，索引形式
     */
    public function fetch_row($query);

    /**
     * 返回结果集，键值形式
     */
    public function fetch_assoc($query);

    /**
     * 返回一行结果集，键值形式
     */
    public function fetch_assoc_one($query);

    /**
     * 返回结果集，索引+鍵值形式
     */
    public function fetch_array($query);

    /**
     * 执行query，返回结果集
     */
    public function exec_query($query);

    /**
     * 获取结果集的个数
     */
    public function num_rows($query);
}
