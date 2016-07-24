<?php

namespace Core\SqlLink;

use Core\SqlLink\SqlLinkInstance;

class SqlLinkFactory {

    public static $tp_instance;
    public static $common_instance;
    public static $xm_instance;

    public static function createNtjoyDatabase() {
        if (self::$tp_instance == NULL) {
            self::$tp_instance = new SqlLinkInstance();
            self::$tp_instance->setServer('192.168.20.20');
            self::$tp_instance->setUserName('webuser');
            self::$tp_instance->setPassWord('webuserpassword');
            self::$tp_instance->setDataBase('com_ntjoy_www');
            return self::$tp_instance;
        }
    }

    public static function createXmDatabase() {
        if (self::$xm_instance == NULL) {
            self::$xm_instance = new SqlLinkInstance();
            self::$xm_instance->setServer('192.168.20.3');
            self::$xm_instance->setUserName('webuser');
            self::$xm_instance->setPassWord('webuserpassword');
            self::$xm_instance->setDataBase('m_ntjoy_com');
            return self::$xm_instance;
        }
    }

    public static function createCommonData($server, $username, $password, $database) {
        self::$common_instance = new SqlLinkInstance();
        self::$common_instance->setServer($server);
        self::$common_instance->setUserName($username);
        self::$common_instance->setPassWord($password);
        self::$common_instance->setDataBase($database);
        return self::$common_instance;
    }

}
