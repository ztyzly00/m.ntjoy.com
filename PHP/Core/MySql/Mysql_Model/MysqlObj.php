<?php

namespace Core\MySql\Mysql_Model;

use Core\MySql\Mysql_Interface;
use Core\SqlLink;

class MysqlObj implements Mysql_Interface\iMySqlObj {

    private static $_instance;
    private $link;

    public function __construct() {
        //获取ntjoy数据库实例(192.168.20.20)
        $dataBaseInstance = SqlLink\SqlLinkFactory::createNtjoyDatabase();
        //获取连接句柄
        $this->link = $dataBaseInstance->getDbLink();
    }

    /**
     * 获取本身对象的实例
     * @return type
     */
    public static function getInstance() {
        if (self::$_instance == NULL) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function exec_query($query) {
        mysqli_query($this->link, $query);
    }

    public function fetch_array($query) {
        $result = mysqli_query($this->link, $query);
        $returnString = array();
        while ($row = mysqli_fetch_array($result)) {
            $returnString[] = $row;
        }
        return $returnString;
    }

    public function fetch_assoc($query) {
        $result = mysqli_query($this->link, $query);
        $returnString = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $returnString[] = $row;
        }
        return $returnString;
    }

    public function fetch_row($query) {
        
    }

    public function num_rows($query) {
        $result = mysqli_query($this->link, $query);
        $row_nums = mysqli_num_rows($result);
        return $row_nums;
    }

}
