/**
 * Created by Zanuck on 2016/5/18.
 */

//浏览器的高度
var BROWSER_HEIGHT = document.documentElement.clientHeight;

var CUR_HEIGHT;

/* dom加载完毕执行 */
$(function() {
    cssInit();
    /* lazyload */
    $("img.lazy").lazyload();
});

/* 初始化css */
function cssInit() {
    modifyContent();
    loadWeiXinJs();
    loadCommentCount();
    loadCommentListByUpCount();
}

/* 修改正文样式 */
function modifyContent() {
    $('#art_main_card_id img').addClass('news_img');
    /* LazyLoad */
    $('#art_main_card_id img').addClass('lazy');
    $('#art_main_card_id img').removeAttr('style');
    $('#art_main_card_id img').removeAttr('height');
    $('#art_main_card_id img').removeAttr('width');
    $('#art_main_card_id p').addClass('art_t');

}

/* 加载微信分享模块 */
function loadWeiXinJs() {

    var cr_link = window.location.href;

    $.get("Ajax/WeiXinAjax.php", {cr_link: cr_link}, function(result) {

        var Wx_attr_list = eval('(' + result + ')');

        wx.config({
            debug: false,
            appId: Wx_attr_list['appId'],
            timestamp: Wx_attr_list['timestamp'],
            nonceStr: Wx_attr_list['nonceStr'],
            signature: Wx_attr_list['signature'],
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo'
            ]

        });

        wx.ready(function() {
            wx.onMenuShareTimeline({
                title: cr_title,
                link: '',
                imgUrl: cr_img_url,
                success: function() {

                },
                cancel: function() {

                }
            });
            wx.onMenuShareAppMessage({
                title: cr_title,
                desc: cr_brief_cut,
                link: '',
                imgUrl: cr_img_url,
                type: 'link',
                dataUrl: '',
                success: function() {

                },
                cancel: function() {

                }
            });

        });
    });
}

/* 评论数加载 */
function loadCommentCount() {
    $.get("Ajax/CommentCountAjax.php", {newsid: newsid}, function(result) {
        $('.j_article_cmnt_count').html(result);
    });
}

/* 加载热门评论 */
function loadCommentListByUpCount() {
    $.get("Ajax/CommentListAjax.php", {newsid: newsid, offset: offset, count: count}, function(result) {
        $(".j_comment_box").html("");
        var comment_list = eval('(' + result + ')');
        if (comment_list.length != 0) {
            for (var i = 0; i < comment_list.length; i++) {
                var add_string = "<div class=\"comment-wrap clearfix\"><div class=\"author clearfix\"><address>" + comment_list[i]['nickname'] + "<\/address><time class=\"cmnt_op_bottom_times\">" + comment_list[i]['time'] + "<\/time><\/div><article class=\"j_cmnt_article\">" + comment_list[i]['comment'] + "<\/article><div class=\"cmnt_op_bottom clearfix\"><span class=\"cmnt_op\" style=\"display:none\"><a href=\"javascript:void(0);\" title=\"赞\" class=\"good on\"><i class=\"icon-page_praise\"><\/i>103<i class=\"fly icon-page_praise\"><\/i><\/a><a href=\"javascript:void(0);\" title=\"评论\" class=\"cmntico\"><i class=\"icon-page_comment_4\"><\/i><\/a><\/span><\/div><\/div>";
                $(".j_comment_box").append(add_string);
            }
        }
    });
}

/* 加载到页面的最低端 */
function getBottom() {
    window.scrollTo(0, BROWSER_HEIGHT);
}



/*事件列表*/
//滚动事件
$(window).scroll(function() {
    if ($(window).scrollTop() > 400) {
        $('#pageJumpBtn >a').css('display', 'block');
    } else {
        $('#pageJumpBtn >a').css('display', 'none');
    }
});

//nav按钮
$('#h_nav_menu').click(function() {
    if ($('#topLevelNav').css('display') == 'none') {
        $('#topLevelNav').css('display', 'block');
    } else {
        $('#topLevelNav').css('display', 'none');
    }
});

//登录按钮
$('.hIcon').click(function() {
    //alert('功能开发中~如有问题请联系微信号：ztyzly00');
});

//回顶部按钮事件
$('#goPageTop').click(function() {
    window.scrollTo(0, 0);
});

//评论框弹出事件
$('#foot_cmt_id').click(function() {
    //记住用户当前高度
    CUR_HEIGHT = $(window).scrollTop();
    $('#main_body').css('display', 'none');
    $('#j_cmnt_pop').css('display', 'block');
    $('#j_blankBox').css('height', (BROWSER_HEIGHT - 200) + 'px');
    window.scrollTo(0, BROWSER_HEIGHT);
});

//评论框取消事件
$('#j_cmnt_cancel').click(function() {
    $('#main_body').css('display', 'block');
    $('#j_cmnt_pop').css('display', 'none');
    window.scrollTo(0, CUR_HEIGHT);
});

//评论发送按钮
$('#j_cmnt_smt').click(function() {
    var comment = $('#j_cmnt_input').val();
    if (comment.length <= 0 || comment.length > 200) {
        alert("请按照规范填写");
    } else {
        $.get("Ajax/CommentInsertAjax.php", {userid: userid, newsid: newsid, tocommentid: tocommentid, comment: comment}, function(result) {
            $('#j_cmnt_pop').css('display', 'none');
            $('#main_body').css('display', 'block');
            $('#j_cmnt_input').val('');
            //评论数加载
            loadCommentCount();
            //加载热门评论
            loadCommentListByUpCount();
            //滚动到最底部，让用户直接看到自己的评论
            window.scrollTo(0, $(document).height() + 100);
        });
    }
});
