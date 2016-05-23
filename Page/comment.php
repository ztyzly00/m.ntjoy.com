<?php
require_once __DIR__ . '/../PHP/autoload.php';

use Manager\CommentManager;

$newsid = $_GET['newsid'];

$comment_count = CommentManager::getCommentCount($newsid);

$comment_list_by_upcount = CommentManager::getCommentListByUpCount($newsid, 0, 5);
$comment_list_by_time = CommentManager::getCommentListByTime($newsid, 0, 5);

//print_r($comment_list_by_upcount);
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no"/>
        <meta charset="UTF-8">
        <title>Title</title>
        <!--加载css-->
        <link href="css/ntjoy_comment.css" rel="stylesheet">
    </head>
    <body>

        <!--主要评论区域-->
        <div id="pullLoaderContent">
            <!--header初始区域-->
            <div class="articleHead">
                <div class="mainNav">
                    <span class="j_backPrePage backPrevPage"></span>
                    <p class="center_tips">评论(<span><?= $comment_count ?></span>)</p>
                </div>
            </div>

            <!--评论页面-->
            <div class="input_wrap">
                <div class="cmnt_article">

                    <!--热点评论-->
                    <?php
                    for ($i = 0; $i < count($comment_list_by_upcount); $i++) {
                        ?>
                        <div class="cmnt_list">
                            <div class="cmnt_item">
                                <p class="cmnt_top">
                                    <span>
                                        <img src="img/default_user.gif">
                                        <i class="cmnt_nick"><?= $comment_list_by_upcount[$i]['nickname'] ?></i>
                                    </span>
                                </p>
                                <p class="cmnt_text">
                                    <?= $comment_list_by_upcount[$i]['comment'] ?>
                                </p>
                                <div class="cmnt_op_bottom clearfix">
                                    <p class="cmnt_op_bottom_times"> <?= $comment_list_by_upcount[$i]['time'] ?></p>
                                    <span class="cmnt_op">
                                        <a class="good j_favor_single"  data-commentid="<?= $comment_list_by_upcount[$i]['commentid'] ?>">
                                            0
                                        </a>
                                        <a href="#" class="cmntico j_cmnt_single" data-nickname="<?= $comment_list_by_upcount[$i]['nickname'] ?>" 
                                           data-commentid="<?= $comment_list_by_upcount[$i]['commentid'] ?>" 
                                           data-userid="<?= $comment_list_by_upcount[$i]['userid'] ?>"></a>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <?php
                    }
                    ?>

                    <!--用户对用户评论-->
                    <div class="cmnt_item">
                        <p class="cmnt_top">
                            <span>
                                <img src="img/default_user.gif">
                                <i class="cmnt_nick">用户5123515145</i>
                            </span>
                        </p>
                        <div class="cmnt_base">
                            <p class="cmnt_top">
                                <span>小强滴微博</span>
                                <span class="cmnt_source">56分钟前</span>
                            </p>
                            <p class="cmnt_text">
                                这个论调能公开发表，说明房价还是会继续涨！这么多年总结的经验下来，越是唱衰房地产房地产越是涨，有钱的还是赶紧买房，十几二十年内房子还是硬通货！只有等到实体经济真正大面积破产倒闭，社会由于大面积失业开始动荡起来了，房地产才会开始走向衰败，否则政府无论如何是不会让动荡从房地产开始的。 </p>
                        </div>

                        <p class="cmnt_text">你有钱可以投资的，这个文章是告诉那些没有实力靠银行贷款草房子的人必死。</p>
                        <div class="cmnt_op_bottom clearfix">
                            <p class="cmnt_op_bottom_times">18分钟前</p>
                            <span class="cmnt_op">
                                <a href="#" class="good j_favor_single">5</a>
                                <a href="#" class="cmntico j_cmnt_single"></a>
                            </span>
                        </div>
                    </div>

                    <!--评论分界线-->
                    <div class="cmnt_more">
                        <span>以下为最新评论</span>
                    </div>

                    <?php
                    for ($i = 0; $i < count($comment_list_by_time); $i++) {
                        ?>
                        <div class="cmnt_list" id="j_newslist">
                            <div class="cmnt_item">
                                <p class="cmnt_top">
                                    <span>
                                        <img src="img/default_user.gif">
                                        <i class="cmnt_nick"><?= $comment_list_by_time[$i]['nickname'] ?></i>
                                    </span>
                                </p>
                                <p class="cmnt_text"><?= $comment_list_by_time[$i]['comment'] ?></p>
                                <div class="cmnt_op_bottom clearfix">
                                    <p class="cmnt_op_bottom_times"><?= $comment_list_by_time[$i]['time'] ?></p>
                                    <span class="cmnt_op">
                                        <a href="javascript:void(0);" class="good j_favor_single" id="good_up_id">
                                            0
                                            <i class="fly" style="display: none"></i>
                                        </a>
                                        <a href="javascript:void(0);" title="评论" class="cmntico j_cmnt_single"></a>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <?php
                    }
                    ?>

                    <!--最新评论-->
                    <div class="cmnt_list" id="j_newslist">
                        <div class="cmnt_item">
                            <p class="cmnt_top">
                                <span>
                                    <img src="img/default_user.gif">
                                    <i class="cmnt_nick">用户</i>
                                </span>
                            </p>
                            <p class="cmnt_text">看看这些评论吧！政府还谈什么公信力。如果来个全国普查，会是什么结果？大家猜猜。</p>
                            <div class="cmnt_op_bottom clearfix">
                                <p class="cmnt_op_bottom_times">3分钟前</p>
                                <span class="cmnt_op">
                                    <a href="javascript:void(0);" class="good j_favor_single" id="good_up_id">
                                        0
                                        <i class="fly" style="display: none"></i>
                                    </a>
                                    <a href="javascript:void(0);" title="评论" class="cmntico j_cmnt_single"></a>
                                </span>
                            </div>
                        </div>
                    </div>

                    <!--加载更多-->
                    <aside>
                        <div class="more_btnbox" id="j_pullLoader">
                            <div class="more_btn_loading " id="j_loading">
                                <span class="more_btn">小镇加载中...</span>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>

            <!--底部评论区域-->
            <section class="foot_comment" style="">
                <aside class="foot_commentcont">
                    <div class="foot_cmt_input j_cmt_btn" data-sudaclick="comment_cmt_btn"><p>说说你的看法</p></div>
                    <div class="foot_cmt_num j_cmt_btn">
                        <a href="javascript:;" title="">
                            <span class="cmt_num_t j_article_cmnt_count" data-sudaclick="comment_cmt_btn">
                                <?= $comment_count ?>
                            </span>
                        </a>
                    </div>
                </aside>
            </section>

        </div>

        <!--弹出评论框区域-->
        <section class="cmnt_pop" id="j_cmnt_pop" style="display: none;">
            <aside id="j_blankBox" style="width:100%; height:484px;"></aside>
            <aside class="cmnt_wrap">
                <div class="cmnt_tp">
                    <span class="fl">
                        <a href="javascript:void(0);" class="cmnt_cancel" id="j_cmnt_cancel"
                           data-sudaclick="article_new_cms_send_cancel">取消</a>
                    </span>
                    <span class="fr"><a href="javascript:void(0);" class="cmnt_smt" id="j_cmnt_smt"
                                        data-sudaclick="article_new_cms_send_cmnt">发送
                        </a>
                    </span>
                </div>
                <div class="cmnt_login">
                    <span class="fl">
                        ztyzly00
                    </span>
                </div>
                <div class="cmntarea">
                    <textarea id="j_cmnt_input" class="newarea" name="" placeholder="说说你的看法"></textarea>
                </div>
            </aside>
        </section>

        <!--加载js-->
        <script src="js/jquery-1.12.3.js"></script>
        <script>
            var newsid =<?= $newsid ?>;
            var userid = '';
        </script>
        <script src="js/ntjoy_comment.js"></script>

    </body>
</html>