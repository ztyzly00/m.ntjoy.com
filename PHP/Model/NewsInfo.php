<?php

/**
 * NewsInfo实例对象  新闻单例
 */

namespace Model;

use Core\MySql\Mysql_Model;
use Core\Redis\RedisFactory;

class NewsInfo {

    /**
     * 需要性能优化，除了缓存，调用方法尽量以静态为准
     * (因是迫不得已为了框架性大量循环，所以加入redis缓存)
     * 获取单新闻内容信息,根据liv_contentmap中的唯一id
     * @param type $article_id 文章id
     * @param type $column_id 栏目id
     */
    public static function getNewsInfoById($id) {
        //初始化redis链接
        $redis_obj = RedisFactory::createRedisInstance();
        //缓存未命中
        if (!$return_array = $redis_obj->hGetAll('newsinfo_' . $id)) {
            $mysql_obj = Mysql_Model\MysqlObj::getInstance();
            $query = "select "
                    . "lc.*,lac.content,la.*,lm.*,lcol.colname "
                    . "from liv_contentmap lc "
                    . "LEFT JOIN liv_article la on lc.contentid=la.articleid "
                    . "left join liv_article_contentbody lac on lac.articleid=lc.contentid "
                    . "left join liv_material lm on la.loadfile=lm.materialid "
                    . "left join liv_column lcol on lc.columnid=lcol.columnid "
                    . "WHERE lc.id=$id limit 1";

            $fetch_array = $mysql_obj->fetch_assoc($query);
            $return_array = self::addExtraAttributes($fetch_array[0]);
            //redis缓存数据
            $redis_obj->hMset('newsinfo_' . $id, $return_array);
        }

        return $return_array;
    }

    /**
     * 给新闻数据数组添加相应的属性
     * @param type $array
     */
    public static function addExtraAttributes($array) {
        //基础内容网站地址
        $base_url = "http://www.ntjoy.com";

        //处理标题截取和视频地址
        $video_string = $array['video'];
        $video_array = explode('#', $video_string);
        $array['video_url'] = $video_array[0];
        $array['title_cut'] = mb_substr($array['title'], 0, 19);
        $array['title_cut'] = $array['title_cut'] . '..';
        $array['brief_cut'] = mb_substr($array['brief'], 0, 35);
        $array['brief_cut'] = $array['brief_cut'] . '...';
        if (count($video_array) > 2) {
            $array['video_img_url'] = 'http://www.ntjoy.com/' . $video_array[2];
        } else {
            $array['video_img_url'] = "img/dianshitai.jpg";
        }

        //获取图片地址 thumbfile_url 正方形压缩图片  thumbfile2_url 扁长压缩图片  small_thumbfile_url 超小正方形压缩图片
        $array['thumbfile_url'] = $base_url . $array['filepath'] . $array['thumbfile'];
        $array['thumbfile2_url'] = $base_url . $array['filepath'] . $array['thumbfile2'];
        $array['small_thumbfile_url'] = $base_url . $array['filepath'] . $array['small_thumbfile'];
        if ($array['thumbfile2_url'] == $base_url) {
            $array['thumbfile2_url'] = $array['video_img_url'];
        }
        if ($array['small_thumbfile_url'] == $base_url) {
            $array['small_thumbfile_url'] = $array['video_img_url'];
        }
        if ($array['thumbfile_url'] == $base_url) {
            $array['thumbfile_url'] = $array['video_img_url'];
        }

        //时间转换
        $array['pubdate'] = date("Y-m-d H:i:s", $array['pubdate']);

        //文章图片地址替换
        $array['content'] = self::transferUrl($array['content']);

        return $array;
    }

    /**
     * 将{$weburl}转换为http://www.ntjoy.com/
     * @param type $string
     */
    public static function transferUrl($string) {
        return str_replace('{$weburl}', "http://www.ntjoy.com/", $string);
    }

}
