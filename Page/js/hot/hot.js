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
$(function() {
    myScroll = new IScroll('.roll-bar',
            {
                click: true,
                scrollX: true,
            });
});
