/**
 * Created by zanuck on 2016/5/18.
 * For ntjoy
 */

/* The height of the browser */
var BROWSER_HEIGHT = document.documentElement.clientHeight;

var CUR_HEIGHT;

/* dom done */
$(function() {
    cssInit();
    /* lazyload */
    $("img.lazy").lazyload();
});

/* init css */
function cssInit() {
    modifyContent();
    loadWeiXinJs();
    loadCommentCount();
    loadCommentListByUpCount();
    loadRecommendNews('news');
    loadRecommendNews('video');
    loadRecommendImg();
}

/* Modify content for better render */
function modifyContent() {
    $('#art_main_card_id img').addClass('news_img');

    /* Modify for lazyLoad */
    $('#art_main_card_id img').addClass('lazy');
    $('#art_main_card_id img').removeAttr('style');
    $('#art_main_card_id img').removeAttr('height');
    $('#art_main_card_id img').removeAttr('width');
    $('#art_main_card_id p').addClass('art_t');

}

/* Load WX module */
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

/* Load Comment Count */
function loadCommentCount() {
    $.get("Ajax/CommentCountAjax.php", {newsid: newsid}, function(result) {
        $('.j_article_cmnt_count').html(result);
    });
}

/* Load hot comment */
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

function loadRecommendNews(classify) {

    if (classify == 'news') {
        $('#news_module_wait').css('display', 'block');
    } else if (classify == 'video') {
        $('#video_module_wait').css('display', 'block');
    }

    $.get('Ajax/News/RecommendAjax.php', {classify: classify}, function(result) {
        if (classify == 'news') {
            $('#news_module_wait').css('display', 'none');
        } else if (classify == 'video') {
            $('#video_module_wait').css('display', 'none');
        }
        changeCss(result);
    });

    function changeCss(result) {
        var list = eval('(' + result + ')');
        var style_string = '';
        if (classify == 'news') {
            style_string = "<\/a><span style=\"border: 1px solid #fa4e46;\"><a style=\"float:right;color: #fa4e46\">";
        } else if (classify == 'video') {
            style_string = "<\/a><span style=\"border: 1px solid #fdaf38;\"><a style=\"float:right;color: #fdaf38\">";
        }
        for (var i = 0; i < list.length; i++) {
            var append_string = "<a href=\"news"
                    + list[i]['id'] +
                    ".html\"><dl class=\"clearfix\"><dt class=\"j_art_lazy\"><img class=\"lazy\" src=\""
                    + list[i]['small_thumbfile_url'] +
                    "\"><\/dt><dd><h3 class=\"title\">"
                    + list[i]['title'] +
                    "<\/h3><div class=\"mark_count\"><a>"
                    + list[i]['pubdate_without_year'] +
                    style_string
                    + list[i]['colname'] +
                    "<\/a><\/span><\/div><\/dd><\/dl><\/a>";
            if (classify == 'news') {
                $('#news_module').append(append_string);
            } else if (classify == 'video') {
                $('#video_module').append(append_string);
            }
        }
    }


}

function loadRecommendImg() {

    $('#picture_module_wait').css('display', 'block');

    $.get('Ajax/News/RecommendAjax.php', {classify: 'img'}, function(result) {
            $('#picture_module_wait').css('display', 'none');
        changeCss(result);
    });

    function changeCss(result) {
        
        var list = eval('(' + result + ')');
        for (var i = 0; i < list.length; i++) {
            var append_string = "<li class=\"j_hotpic_item\"><a href=\"news"
                    + list[i]['id'] +
                    ".html\"><div class=\"fixpic-wrap\"><img class=\"lazy\" src=\""
                    + list[i]['small_thumbfile_url'] +
                    "\"><p>"
                    + list[i]['title'] +
                    "<\/p><\/div><\/a><\/li>";
            $('.picture_moudule').append(append_string);
        }
    }
}

/* get bottom of the browser */
function getBottom() {
    window.scrollTo(0, BROWSER_HEIGHT);
}




/* scroll event */
$(window).scroll(function() {
    if ($(window).scrollTop() > 400) {
        $('#pageJumpBtn >a').css('display', 'block');
    } else {
        $('#pageJumpBtn >a').css('display', 'none');
    }
});

/* h_nav_menu click event */
$('#h_nav_menu').click(function() {
    if ($('#topLevelNav').css('display') == 'none') {
        $('#topLevelNav').css('display', 'block');
        $('.ntjoy_menu').css('display', 'block');
    } else {
        $('#topLevelNav').css('display', 'none');
        $('.ntjoy_menu').css('display', 'none');
    }
});


/* get top */
$('#goPageTop').click(function() {
    window.scrollTo(0, 0);
});

/* comment click start */
$('#foot_cmt_id').click(function() {
    /* Remember the height of the user browser */
    CUR_HEIGHT = $(window).scrollTop();
    $('#main_body').css('display', 'none');
    $('#j_cmnt_pop').css('display', 'block');
    $('#j_blankBox').css('height', (BROWSER_HEIGHT - 200) + 'px');
    window.scrollTo(0, BROWSER_HEIGHT);
});

/* comment click cancel */
$('#j_cmnt_cancel').click(function() {
    $('#main_body').css('display', 'block');
    $('#j_cmnt_pop').css('display', 'none');
    window.scrollTo(0, CUR_HEIGHT);
});

/* search click start */
$('.search_button').click(function() {
    var key_word = $('.search_input').val();
    window.location.href = 'search.php?keyword=' + key_word;
});

/* comment send click */
$('#j_cmnt_smt').click(function() {
    var comment = $('#j_cmnt_input').val();
    if (comment.length <= 0 || comment.length > 200) {
        alert("请按照规范填写");
    } else {
        $.get("Ajax/CommentInsertAjax.php", {userid: userid, newsid: newsid, tocommentid: tocommentid, comment: comment}, function(result) {
            $('#j_cmnt_pop').css('display', 'none');
            $('#main_body').css('display', 'block');
            $('#j_cmnt_input').val('');
            loadCommentCount();
            loadCommentListByUpCount();
            window.scrollTo(0, $(document).height() + 100);
        });
    }
});

/* change recommend click */
$('#recommend_span').click(function() {
    $('#news_module').empty();
    loadRecommendNews('news');
});
$('#video_span').click(function() {
    $('#video_module').empty();
    loadRecommendNews('video');
});
$('#img_span').click(function() {
    $('.picture_moudule').empty();
    loadRecommendImg();
});
