/**
 * Created by Zanuck on 2016/5/18.
 */

//浏览器的高度
var BROWSER_HEIGHT = document.documentElement.clientHeight;

var CUR_HEIGHT;

//初始化css
function cssInit() {
    //修改正文样式
    modifyContent();
    //评论数加载
    loadCommentCount();
    //加载热门评论
    loadCommentListByUpCount();
}

//修改正文样式
function modifyContent() {
    //若没有图片js会报一条错误，不过无所谓
    $('#art_main_card_id img').addClass('news_img');
    //让图片延时加载
    $('#art_main_card_id img').addClass('lazy');
    $('#art_main_card_id p').addClass('art_t');

}

//评论数加载
function loadCommentCount() {
    $.post("http://xm.ntwifi.cn/m.ntjoy.com/PHP/Ajax/CommentCountAjax.php", {newsid: newsid}, function(result) {
        $('.j_article_cmnt_count').html(result);
    });
}

//加载热门评论
function loadCommentListByUpCount() {
    $.post("http://xm.ntwifi.cn/m.ntjoy.com/PHP/Ajax/CommentListAjax.php", {newsid: newsid, offset: offset, count: count}, function(result) {
        $(".j_comment_box").html("");
        var comment_list = eval('(' + result + ')');
        if (comment_list) {
            for (var i = 0; i < comment_list.length; i++) {
                var add_string = "<div class=\"comment-wrap clearfix\"><div class=\"author clearfix\"><address>" + comment_list[i]['nickname'] + "<\/address><time class=\"cmnt_op_bottom_times\">" + comment_list[i]['time'] + "<\/time><\/div><article class=\"j_cmnt_article\">" + comment_list[i]['comment'] + "<\/article><div class=\"cmnt_op_bottom clearfix\"><span class=\"cmnt_op\" style=\"display:none\"><a href=\"javascript:void(0);\" title=\"赞\" class=\"good on\"><i class=\"icon-page_praise\"><\/i>103<i class=\"fly icon-page_praise\"><\/i><\/a><a href=\"javascript:void(0);\" title=\"评论\" class=\"cmntico\"><i class=\"icon-page_comment_4\"><\/i><\/a><\/span><\/div><\/div>";
                $(".j_comment_box").append(add_string);
                $(".th_td").html('最新评论');
            }
        } else {
            $(".th_td").append("（当前无人评论哦~快来抢沙发吧）");
        }
    });
}

//加载到页面的最低端
function getBottom() {
    window.scrollTo(0, BROWSER_HEIGHT);
}

//dom加载完毕执行
$(function() {
    cssInit();
    //图片延时加载
    $("img.lazy").lazyload();
});

/*事件列表*/
//滚动事件
$(window).scroll(function() {
    if ($(window).scrollTop() > 400) {
        $('#pageJumpBtn >a').css('display', 'block');
    } else {
        $('#pageJumpBtn >a').css('display', 'none');
    }
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
        $.post("http://xm.ntwifi.cn/m.ntjoy.com/PHP/Ajax/CommentInsertAjax.php", {userid: userid, newsid: newsid, touserid: touserid, comment: comment}, function(result) {
            $('#j_cmnt_pop').css('display', 'none');
            $('#main_body').css('display', 'block');
            $('#j_cmnt_input').val('');
        });
    }
});