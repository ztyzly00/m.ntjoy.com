<?php
require_once __DIR__ . '/../PHP/autoload.php';

use Manager\CommentManager;

$newsid = $_GET['newsid'];
$comment_count = CommentManager::getCommentCount($newsid);

//时间排序列表
$comment_list_by_time = CommentManager::getCommentListByTime($newsid, 0, 5);
//最新排序列表
$comment_list_by_upcount = CommentManager::getCommentListByUpCount($newsid, 0, 5);
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no"/>
        <meta charset="UTF-8">
        <title>评论</title>
        <!--加载css-->
        <link href="css/comment/ntjoy_comment.css" rel="stylesheet">
    </head>
    <body>
        <!--主要评论区域-->
        <div id="pullLoaderContent">
            <!--header初始区域-->
            <div class="articleHead">
                <div class="mainNav">
                    <a href="javascript:history.go(-1);">
                        <span  class="j_backPrePage backPrevPage"></span></a>
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

                                <?php
                                if ($comment_list_by_upcount[$i]['tocommentid']) {
                                    $cr_comment_list = CommentManager::getCommentById($comment_list_by_upcount[$i]['tocommentid']);
                                    ?>
                                    <div class="cmnt_base">
                                        <p class="cmnt_top">
                                            <span><?= $cr_comment_list['nickname'] ?></span>
                                            <span class="cmnt_source"><?= $cr_comment_list['time'] ?></span>
                                        </p>
                                        <p class="cmnt_text">
                                            <?= $cr_comment_list['comment'] ?>   
                                        </p>
                                    </div>
                                    <?php
                                }
                                ?>

                                <p class="cmnt_text">
                                    <?= $comment_list_by_upcount[$i]['comment'] ?>
                                </p>
                                <div class="cmnt_op_bottom clearfix">
                                    <p class="cmnt_op_bottom_times"> <?= $comment_list_by_upcount[$i]['time'] ?></p>
                                    <span class="cmnt_op">
                                        <a class="good j_favor_single"  data-commentid="<?= $comment_list_by_upcount[$i]['commentid'] ?>">
                                            <?= $comment_list_by_upcount[$i]['upcount'] ?>
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


                    <!--评论分界线-->
                    <div class="cmnt_more">
                        <span>以下为最新评论</span>
                    </div>

                    <!--最新评论-->  
                    <?php
                    for ($i = 0; $i < count($comment_list_by_time); $i++) {
                        ?>
                        <div class="cmnt_list">
                            <div class="cmnt_item">
                                <p class="cmnt_top">
                                    <span>
                                        <img src="img/default_user.gif">
                                        <i class="cmnt_nick"><?= $comment_list_by_time[$i]['nickname'] ?></i>
                                    </span>
                                </p>

                                <?php
                                if ($comment_list_by_time[$i]['tocommentid']) {
                                    $cr_comment_list = CommentManager::getCommentById($comment_list_by_time[$i]['tocommentid']);
                                    ?>
                                    <div class="cmnt_base">
                                        <p class="cmnt_top">
                                            <span><?= $cr_comment_list['nickname'] ?></span>
                                            <span class="cmnt_source"><?= $cr_comment_list['time'] ?></span>
                                        </p>
                                        <p class="cmnt_text">
                                            <?= $cr_comment_list['comment'] ?>   
                                        </p>
                                    </div>
                                    <?php
                                }
                                ?>

                                <p class="cmnt_text">
                                    <?= $comment_list_by_time[$i]['comment'] ?>
                                </p>
                                <div class="cmnt_op_bottom clearfix">
                                    <p class="cmnt_op_bottom_times"> <?= $comment_list_by_time[$i]['time'] ?></p>
                                    <span class="cmnt_op">
                                        <a class="good j_favor_single"  data-commentid="<?= $comment_list_by_time[$i]['commentid'] ?>">
                                            <?= $comment_list_by_time[$i]['upcount'] ?>
                                        </a>
                                        <a href="#" class="cmntico j_cmnt_single" data-nickname="<?= $comment_list_by_time[$i]['nickname'] ?>" 
                                           data-commentid="<?= $comment_list_by_time[$i]['commentid'] ?>" 
                                           data-userid="<?= $comment_list_by_time[$i]['userid'] ?>"></a>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <?php
                    }
                    ?>

                    <!--加载更多-->
                    <aside>
                        <div class="more_btnbox" id="j_pullLoader" style="display: none">
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
        <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
        <script>
            var newsid =<?= $newsid ?>;
            var userid = '';
        </script>
        <script src="js/comment/ntjoy_comment.js"></script>
    </body>
</html>