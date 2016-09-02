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

var myScroll;
//document.body.addEventListener('touchmove', function(event) {
//    event.preventDefault();
//}, false);
$(function() {
    myScroll = new IScroll('.roll-bar',
            {
                //  mouseWheel: true, //PC端的鼠标事件也监听，方便PC端调试
                click: true, //允许点击事件
                //eventPassthrough: true, //纵向滚动整个页面，横向滚动iscroll区域
                scrollX: true, //默认是纵向，横向需要设置scrollX
            });
});

