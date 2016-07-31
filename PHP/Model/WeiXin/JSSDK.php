<?php

namespace Model\WeiXin;

class JSSDK {

    private $appId;
    private $appSecret;
    private $link;
    private $cr_link;

    const _MYSQL_USERNAME = "webuser";
    const _MYSQL_PASSWORD = "webuserpassword";
    const _MYSQL_SERVER = "192.168.20.3";
    const _MYSQL_DATABASE = "m_ntjoy_com";

    public function __construct($appId, $appSecret, $cr_link) {
        $this->appId = $appId;
        $this->appSecret = $appSecret;
        $this->link = $this->getDblink();
        $this->cr_link = $cr_link;
    }

    public function __destruct() {
        mysql_close($this->link);
    }

    public function getSignPackage() {
        $jsapiTicket = $this->getJsApiTicket();
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $url = "$protocol$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
        $timestamp = time();
        $nonceStr = $this->createNonceStr();
        $url = $this->cr_link;
        // 这里参数的顺序要按照 key 值 ASCII 码升序排序
        $string = "jsapi_ticket=$jsapiTicket&noncestr=$nonceStr&timestamp=$timestamp&url=$url";

        $signature = sha1($string);


        $signPackage = array(
            "appId" => $this->appId,
            "nonceStr" => $nonceStr,
            "timestamp" => $timestamp,
            "url" => $url,
            "signature" => $signature,
            "rawString" => $string
        );
        return $signPackage;
    }

    private function getdblink() {

        $link = mysql_connect(self::_MYSQL_SERVER, self::_MYSQL_USERNAME, self::_MYSQL_PASSWORD);
        mysql_select_db(self::_MYSQL_DATABASE, $link);
        mysql_query('set names utf8;', $link);
        mysql_query("set character set 'utf8'", $link);
        return $link;
    }

    private function updateDb($wx_id, $key, $value) {

        return mysql_query("UPDATE `wx_jsapi` SET `$key`='$value' WHERE (`wxid`='$wx_id')", $this->link);
    }

    private function getFromDb($wx_id, $key) {
        $result = mysql_query("SELECT $key FROM `wx_jsapi` WHERE `wxid`='$wx_id';", $this->link);
        $row = mysql_fetch_assoc($result);
        mysql_free_result($result);
        return $row[$key];
    }

    private function createNonceStr($length = 16) {
        $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        $str = "";
        for ($i = 0; $i < $length; $i++) {
            $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
        }
        return $str;
    }

    private function getJsApiTicket() {

        // jsapi_ticket 应该全局存储与更新，以下代码以写入到文件中做示例
//    $data = json_decode(file_get_contents("../jsapi_ticket_ntjoy.json"));
        $data = json_decode($this->getFromDb($this->appId, 'jsapi_ticket'));
        if ($data->expire_time < time()) {
            $accessToken = $this->getAccessToken();
            // 如果是企业号用以下 URL 获取 ticket
            // $url = "https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=$accessToken";
            $url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=$accessToken";
            $res = json_decode($this->httpGet($url));
            $ticket = $res->ticket;
            if ($ticket) {
                $data->expire_time = time() + 7000;
                $data->jsapi_ticket = $ticket;
                $this->updateDb($this->appId, 'jsapi_ticket', json_encode($data));
//        $fp = fopen("../jsapi_ticket_ntjoy.json", "w");
//        fwrite($fp, json_encode($data));
//        fclose($fp);
            }
        } else {
            $ticket = $data->jsapi_ticket;
        }

        return $ticket;
    }

    private function getAccessToken() {
        // access_token 应该全局存储与更新，以下代码以写入到文件中做示例
//    $data = json_decode(file_get_contents("../access_token_ntjoy.json"));
        $data = json_decode($this->getFromDb($this->appId, 'access_token'));
        if ($data->expire_time < time()) {
            // 如果是企业号用以下URL获取access_token
            // $url = "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=$this->appId&corpsecret=$this->appSecret";
            $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$this->appId&secret=$this->appSecret";
            $res = json_decode($this->httpGet($url));
            $access_token = $res->access_token;
            if ($access_token) {
                $data->expire_time = time() + 7000;
                $data->access_token = $access_token;
                $this->updateDb($this->appId, 'access_token', json_encode($data));
//        $fp = fopen("../access_token_ntjoy.json", "w");
//        fwrite($fp, json_encode($data));
//        fclose($fp);
            }
        } else {
            $access_token = $data->access_token;
        }
        return $access_token;
    }

    private function httpGet($url) {


        $res = file_get_contents($url);


        return $res;
    }

}

?>
