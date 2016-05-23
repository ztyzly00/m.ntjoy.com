/**
 * Created by Zanuck on 2016/5/20.
 */

//评论信息
var commentinfo = {
    touserid: '',
};

//赞评论的点击事件
$('.j_favor_single').click(function() {
    var crt_count = parseInt($(this).html());
    $(this).html(crt_count + 1);
    $(this).append('<i class=\"fly\" style=\"display: inline-block\"></i>');
});

//用户区域我要评论点击事件
$('.cmntico').click(function() {
    commentinfo.touserid = $(this).attr('data-userid');
    $('.newarea').attr('placeholder', '回复' + $(this).attr('data-nickname'));
    $('#pullLoaderContent').css('display', 'none');
    $('.cmnt_pop').css('display', 'block');
});

//底部我要评论点击事件
$('.foot_cmt_input').click(function() {
    //直接评论 ，无需对某位用户评论
    commentinfo.touserid = '';
    $('#pullLoaderContent').css('display', 'none');
    $('.cmnt_pop').css('display', 'block');
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
        var touserid = commentinfo.touserid;
        $.post("http://xm.ntwifi.cn/m.ntjoy.com/PHP/Ajax/CommentInsertAjax.php", {userid: userid, newsid: newsid, touserid: touserid, comment: comment}, function(result) {
            $('#j_cmnt_pop').css('display', 'none');
            $('#main_body').css('display', 'block');
            $('#j_cmnt_input').val('');
        });
    }
    
});
