<?php

/**
 * NewsModify,修改新闻数据内容
 */

namespace Model\News;

use Core\MySql\Mysql_Model;
use Model\News\NewsCss;

class NewsModify {

    /**
     * 处理相应的新闻信息
     * @param type $array
     * @return type
     */
    public static function processNewsInfo($array) {
        //将编辑的分页连接
        $return_array = self::addExtraContent($array[0]);
        //修改内容中图片css
        $return_array = NewsCss::ModifyContentImgCss($return_array);
        //增加额外的属性
        $return_array = self::addExtraAttributes($return_array);
        return $return_array;
    }

    /**
     * 编辑发的文章是分页的，需要全部抓取
     */
    public static function addExtraContent($array) {
        $articleid = $array['articleid'];
        $mysql_obj = Mysql_Model\MysqlObj::getInstance();
        $query = "select * from liv_article a "
                . "left join liv_article_contentbody ab on ab.articleid=a.articleid "
                . "where a.articleid=$articleid";
        $fetch_array = $mysql_obj->fetch_assoc($query);
        for ($i = 0; $i < count($fetch_array); $i++) {
            if ($i == 0) {
                continue;
            }
            $array['content'] = $array['content'] . $fetch_array[$i]['content'];
        }
        return $array;
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
        $array['common_img_url'] = $base_url . $array['filepath'] . $array['filename'];
        if ($array['thumbfile2_url'] == $base_url) {
            $array['thumbfile2_url'] = $array['video_img_url'];
        }
        if ($array['small_thumbfile_url'] == $base_url) {
            $array['small_thumbfile_url'] = $array['video_img_url'];
        }
        if ($array['thumbfile_url'] == $base_url) {
            $array['thumbfile_url'] = $array['video_img_url'];
        }
        if ($array['common_img_url'] == $base_url) {
            $array['common_img_url'] = $array['video_img_url'];
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
