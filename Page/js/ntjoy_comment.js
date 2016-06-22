/**
 * Created by Zanuck on 2016/5/20.
 */


/**
 * 全局变量
 * @type @exp;document@pro;documentElement@pro;clientHeight
 */
var BROWSER_HEIGHT = document.documentElement.clientHeight;
var commentinfo = {
    tocommentid: '',
};

/**
 * 为评论点赞
 * @returns {undefined}
 */
function addUpCount() {
    var cr_obj = $(this);
    if (!cr_obj.has('i').length) {
        var crt_count = parseInt($(this).html());
        $(this).html(crt_count + 1);
        $(this).append('<i class=\"fly\" style=\"display: inline-block\"></i>');
        var commentid = $(this).attr('data-commentid');
        $.post("http://xm.ntwifi.cn/m.ntjoy.com/PHP/Ajax/CommentAddUpCount.php", {commentid: commentid}, function(result) {

        });
    }
}

/**
 * 弹出评论区域
 * @returns {undefined}
 */
function popUpCommentArea() {
    commentinfo.tocommentid = $(this).attr('data-commentid');
    $('.newarea').attr('placeholder', '回复' + $(this).attr('data-nickname'));
    $('#pullLoaderContent').css('display', 'none');
    $('.cmnt_pop').css('display', 'block');
    $('#j_blankBox').css('height', (BROWSER_HEIGHT - 200) + 'px');
}

/**
 * 点击事件
 */
//赞评论的点击事件
$('.j_favor_single').click(addUpCount);

//用户区域我要评论点击事件
$('.cmntico').click(popUpCommentArea);

//底部我要评论点击事件
$('.foot_cmt_input').click(function() {
    //直接评论 ，无需对某位用户评论
    commentinfo.tocommentid = '';
    $('#pullLoaderContent').css('display', 'none');
    $('.cmnt_pop').css('display', 'block');
    $('#j_blankBox').css('height', (BROWSER_HEIGHT - 200) + 'px');
});

//评论取消按钮点击事件
$('#j_cmnt_cancel').click(function() {
    $('#pullLoaderContent').css('display', 'block');
    $('.cmnt_pop').css('display', 'none');
});

//评论发送按钮点击事件
$('.cmnt_smt').click(function() {
    var comment = $('#j_cmnt_input').val();
    if (comment.length <= 0 || comment.length > 200) {
        alert("请按照规范填写");
    } else {
        var tocommentid = commentinfo.tocommentid;
        $.post("http://xm.ntwifi.cn/m.ntjoy.com/PHP/Ajax/CommentInsertAjax.php", {userid: userid, newsid: newsid, tocommentid: tocommentid, comment: comment}, function(result) {
            location.reload();
        });
    }
});

//滚动到页面底部触发事件
var offset = 5;
var count = 4;

$(window).scroll(function() {
    if (($(window).height() + $(window).scrollTop()) + 1 >= $(document).height()) {
        $.post("http://xm.ntwifi.cn/m.ntjoy.com/PHP/Ajax/CommentListAjax.php", {newsid: newsid, offset: offset, count: count}, function(result) {
            var obj = eval('(' + result + ')');
            for (var i = 0; i < obj.length; i++) {
                var add_string = "<div class=\"cmnt_list\"><div class=\"cmnt_item\"><p class=\"cmnt_top\"><span><img src=\"img\/default_user.gif\"><i class=\"cmnt_nick\">" + obj[i]['nickname'] + "<\/i><\/span><\/p><p class=\"cmnt_text\">                                  " + obj[i]['comment'] + "<\/p><div class=\"cmnt_op_bottom clearfix\"><p class=\"cmnt_op_bottom_times\"> " + obj[i]['time'] + "<\/p><span class=\"cmnt_op\"><a class=\"good j_favor_single\"  data-commentid=\"" + obj[i]['commentid'] + "\">                                           " + obj[i]['upcount'] + "<\/a><a href=\"#\" class=\"cmntico j_cmnt_single\" data-nickname=\"" + obj[i]['nickname'] + "\"                                            data-commentid=\"" + obj[i]['commentid'] + "\"                                            data-userid=\"" + obj[i]['userid'] + "\"><\/a><\/span><\/div><\/div><\/div>";
                $('.cmnt_article').append(add_string);
            }
            $('.j_favor_single').on('click', addUpCount);
            $('.cmntico').on('click', popUpCommentArea);
            offset = offset + 4;
        });
    }
});

