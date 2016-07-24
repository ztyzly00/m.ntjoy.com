/**
 * Created by Zanuck on 2016/5/16.
 * 小镇纯手写，励志当牛逼前端
 */

//dom加载完毕执行
$(function() {

});


$('#j_menu').click(function() {
    if ($('#topLevelNav').css('display') == 'none') {
        $('#topLevelNav').css('display', 'block');
    } else {
        $('#topLevelNav').css('display', 'none');
    }
});


