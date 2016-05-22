<?php
ob_start();
require_once __DIR__ . '/../PHP/autoload.php';

use Manager\NewsManager;

$id = $_GET['id'];

$new_content_array = NewsManager::getNewsContent($id);
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no"/>
        <meta charset="UTF-8">
        <title><?= $new_content_array['title'] ?></title>
        <!--加载css-->
        <link href="css/ntjoy_news.css" rel="stylesheet">
    </head>
    <body>
        <div id="main_body">
            <!--文章头部-->
            <nav class="newsHead" data-sudaclick="mainNav">
                <h2><a class="h_txt" href="http://xm.ntwifi.cn/m.ntjoy.com/Page/static/home704.html">江海明珠网</a></h2>
                <!-- //页面加载时只需要加载外部a标签 -->
                <a href="#" class="hIcon h_user" title="" id="loginBox"></a>
                <!--<a href="#" class="hIcon h_nav" title=""></a>-->
                <ul class="h_nav_items">
                    <li><a href="http://xm.ntwifi.cn/m.ntjoy.com/Page/static/home<?= $new_content_array['columnid'] ?>.html"><?= $new_content_array['colname'] ?></a></li>
                </ul>
            </nav>

            <!--正文部分-->
            <section class="art_main_card j_article_main" data-sudaclick="articleContent">
                <!--标题-->
                <section class="art_title" data-sudaclick="title_share_cmnt">
                    <h1 class="art_title_h1"><?= $new_content_array['title'] ?></h1>
                    <article class="art_title_op">
                        <time><?= $new_content_array['pubdate'] ?> 江海明珠网</time>
                        <aside>
                            <a href="#">
                                <i class="comment_num icon-page_comment_2"></i>
                                <span class="j_article_cmnt_count">0</span>
                            </a>
                            <!--是否加On-->
                            <!--<a href="javascript:void(0)" title="收藏" class="collection icon-page_collection j_iadd_btn">收藏</a>-->
                        </aside>
                    </article>
                </section>

                <!--视频-->
                <?php
                if ($new_content_array['video_url']) {
                    ?>
                    <div id="player" style="margin-bottom: 20px"></div>
                    <script type="text/javascript" src="js/ckplayer/ckplayer.min.js" charset="utf-8"></script>
                    <script type="text/javascript">
                        var flashvars = {
                            f: "<?= $new_content_array['video_url'] ?>",
                            c: 0,
                            p: 0,
                            r: "http://www.ntjoy.com/tiaozhuan15.html",
                            t: 15,
                            b: 1,
                            my_url: encodeURIComponent(window.location.href)
                        };

                        var video = ["<?= $new_content_array['video_url'] ?>->video/mp4"];
                        CKobject.embed("js/ckplayer/ckplayer.swf", "player", "ckplayer_player", "100%", "100%", false, flashvars, video);
                    </script>
                    <?php
                }
                ?>

                <div id="art_main_card_id">
                    <?= $new_content_array['content'] ?>
                </div>
                <!--顶踩begin-->
<!--                <section class="M_attitude" data-pl="attitude" data-sudaclick="attitude">
                    <aside class="operate" id="j_operate">
                         顶部区域
                        <div class="p_act j_pact">
                            <mark class="hand dig">
                                <span class="hand_pic j_p_btn">
                                    <img class="" src="img/up.png">
                                    <img class=" hide" src="img/up.png">
                                </span>
                            </mark>
                            <mark class="dig_num j_p_num">
                                <span class="">0</span>
                                <span class="">0</span>
                            </mark>
                        </div>

                        <div class="p_bar j_p_bar" style="width: 153px; margin-left: -76px;">
                             红线 
                            <span class="sub_bar dig_bar j_p_upbar"></span>
                             蓝线 
                            <span class="sub_bar tread_bar j_p_downbar"></span>
                        </div>

                         踩部区域
                        <div class="p_act j_pact">
                            <mark class="hand tread">
                                <span class="hand_pic j_p_btn">
                                    <img class="" src="img/down.png" alt="">
                                    <img class=" hide" src="img/down.png"
                                         alt="">
                                </span>
                            </mark>
                            <mark class="tread_num j_p_num">
                                <span>0</span>
                                <span>0</span>
                            </mark>
                        </div>
                    </aside>

                </section>-->
                <!--顶踩end-->
            </section>

            <!--评论部分-->
            <section class="extend-module j_article_hotcmnt" >
                <aside class="th_td">最新评论</aside>
                <aside class="comment_moudule j_comment_box">
                    <div class="comment-wrap clearfix">
                        <div class="author clearfix">
                            <address>用户</address>
                            <time class="cmnt_op_bottom_times">3小时前</time>
                        </div>
                        <article class="j_cmnt_article">评论测试</article>
                        <div class="cmnt_op_bottom clearfix"><span class="cmnt_op" style="display:none"><a
                                    href="javascript:void(0);" title="赞" class="good on"><i class="icon-page_praise"></i>103<i
                                        class="fly icon-page_praise"></i></a><a href="javascript:void(0);" title="评论" class="cmntico"><i
                                        class="icon-page_comment_4"></i></a></span></div>
                    </div>
                    <div class="comment-wrap clearfix">
                        <div class="author clearfix">
                            <address>用户</address>
                            <time class="cmnt_op_bottom_times">3小时前</time>
                        </div>
                        <article class="j_cmnt_article">评论测试</article>
                        <div class="cmnt_op_bottom clearfix"><span class="cmnt_op" style="display:none"><a
                                    href="javascript:void(0);" title="赞" class="good on"><i class="icon-page_praise"></i>103<i
                                        class="fly icon-page_praise"></i></a><a href="javascript:void(0);" title="评论" class="cmntico"><i
                                        class="icon-page_comment_4"></i></a></span></div>
                    </div>
                    <div class="comment-wrap clearfix">
                        <div class="author clearfix">
                            <address>用户</address>
                            <time class="cmnt_op_bottom_times">2小时前</time>
                        </div>
                        <article class="j_cmnt_article">评论测试</article>
                        <div class="cmnt_op_bottom clearfix"><span class="cmnt_op" style="display:none"><a
                                    href="javascript:void(0);" title="赞" class="good on"><i class="icon-page_praise"></i>103<i
                                        class="fly icon-page_praise"></i></a><a href="javascript:void(0);" title="评论" class="cmntico"><i
                                        class="icon-page_comment_4"></i></a></span></div>
                    </div>
                </aside>
                <div class="comment-count">
                    <a href="http://cmnt.sina.cn/index?vt=4&amp;product=comos&amp;index=fxsenvm0550240&amp;tj_ch=news" alt="全部评论">全部评论</a>
                </div>
            </section>

            <!--滚动显示双按钮-->
            <section id="pageJumpBtn" style="position: fixed; bottom: 74px; right: 12px; width: 42px; z-index: 999;">
                <a href="javascript:;" id="goPageTop"
                   style="width:42px; height:42px; margin-bottom:10px; border-radius:50%; background:url(img/go_top_icon.png) no-repeat 0 0; background-size:42px auto; display: none;"></a>
                <a href="http://xm.ntwifi.cn/m.ntjoy.com/Page/static/home<?= $new_content_array['columnid'] ?>.html" id="goPageHome"
                   style=" width:42px; height:42px; position: relative; border-radius:50%; background:url(img/go_home_icon.png) no-repeat 0 0; background-size:42px auto;display: none;">
                    <i style="position: absolute; top: 0px; right: 0px; width: 10px; height: 10px; border: 2px solid rgb(239, 248, 255); border-radius: 50%; background: rgb(255, 71, 67);">
                    </i>
                </a>
            </section>

            <!--底部评论区域-->
            <section class="foot_comment">
                <aside class="foot_commentcont">
                    <div class="foot_cmt_input j_cmt_btn"  id="foot_cmt_id">
                        <p>说说你的看法</p>
                    </div>            
                    <div class="foot_cmt_num j_p_comt">
                        <a href="#" data-sudaclick="article_new_cms_comt">
                            <span class="cmt_num_t j_article_cmnt_count">0</span>
                        </a>
                    </div>
                    <div class="foot_cmt_share j_shareBtn"></div>
                </aside>
            </section>
        </div>
        <!--        <div id="SOHUCS"></div>
                <script id="changyan_mobile_js" charset="utf-8" type="text/javascript" 
                        src="http://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id=cys5huSxC&conf=prod_3241f76198064c3df41cf3b818e5fb9b">
                </script>-->
    </body>

    <!--评论框弹出-->
    <section class="cmnt_pop" id="j_cmnt_pop" style="display: none;" data-mid="">
        <aside id="j_blankBox" style="width:100%; height:484px;"></aside><aside class="cmnt_wrap">
            <div class="cmnt_tp">
                <span class="fl">
                    <a href="javascript:void(0);" class="cmnt_cancel" id="j_cmnt_cancel" data-sudaclick="article_new_cms_send_cancel">取消</a>
                </span>
                <span class="fr"><a class="cmnt_smt" id="j_cmnt_smt" data-sudaclick="article_new_cms_send_cmnt">发送
                    </a>
                </span>
            </div>
            <div class="cmnt_login">
                <span class="fl">
                    匿名用户
                </span>
            </div><div class="cmntarea">
                <textarea id="j_cmnt_input" class="newarea" name="" placeholder="说说你的看法（字数不要超过200字,请大家按照规范填写）"></textarea>
            </div>
        </aside>
    </section>


    <!--加载必要js-->
    <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
    <script src="js/Jquery.lazyload.min.js"></script>

    <script>
                    var offset = 0;
                    var count = 4;
                    var userid = '';
                    var newsid =<?= $id ?>;
                    var touserid = '';
    </script>
    <script src="js/ntjoy_news.js"></script>
</html>


<?php
$flush = ob_get_contents();
file_put_contents(__DIR__ . "/static/news" . $id . ".html", $flush);
?>