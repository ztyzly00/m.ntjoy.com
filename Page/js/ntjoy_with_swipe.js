/**
 * Created by Zanuck on 2016/5/16.
 * 小镇纯手写，励志当牛逼前端
 */

//浏览器宽度
var BROWSER_WIDTH = document.body.clientWidth;

//滑动时间 单位：ms
var SLIDE_DURATION = 300;

//页面初始化
function cssInit() {
    $('.top_slide_wrap').attr('style', 'width:' + (BROWSER_WIDTH * $('.top_slide_wrap div').length) + 'px');
    $('.top_slide_wrap >div').each(function () {
        $(this).css('width', BROWSER_WIDTH);
        $(this).css('left', BROWSER_WIDTH * (-1) * $(this).index());
        var trslatepx = 0;
        var slide_duration = SLIDE_DURATION;
        //改用switch
        if ($(this).index() != 0) {
            trslatepx = BROWSER_WIDTH;
            slide_duration = 0;
        }
        if ($(this).index() == SlideAnimation.slide_img_count - 1) {
            trslatepx = BROWSER_WIDTH * (-1);
            slide_duration = 0;
        }
        $(this).css('transform', 'translate3d(' + trslatepx + 'px,0px,0px)');
        $(this).css('transition-duration', slide_duration + 'ms');
    });
}

//滑动图片类实例
var SlideAnimation = {
    //当前图片index
    slide_img_cr: 0,

    //图片总数量
    slide_img_count: $('.top_slide_wrap div').length,

    //滑动css改变 opt=-1图片x轴变换-width；opt=0图片x轴变换0;opt=1;图片x轴变换width
    imgSlide: function (img_index, opt) {
        var trslatepx;
        if (opt == -1) {
            trslatepx = (-1) * BROWSER_WIDTH;
        } else if (opt == 0) {
            trslatepx = 0;
            this.imgDuration(img_index, 1);
        } else if (opt == 1) {
            trslatepx = BROWSER_WIDTH;
        }
        $('.top_slide_wrap >div').eq(img_index).css('transform', 'translate3d(' + trslatepx + 'px,0px,0px)');
    },

    imgDuration: function (img_index, opt) {
        var slide_duration;
        if (opt == 1) {
            slide_duration = SLIDE_DURATION;
        } else {
            slide_duration = 0;
        }
        $('.top_slide_wrap >div').eq(img_index).css('transition-duration', slide_duration + 'ms');
        //后面图片做好准备
        this.imgSlide(img_index + 2, 1);
    },


};


//滑动函数
function imgSlideAction(img_index, dir) {
    var next_img_index = img_index + 1;
    var next_next_img_index = img_index + 2;
    var pre_img_index = img_index - 1;
    var pre_pre_img_index = img_index - 2;

    if (img_index == 0) {
        pre_img_index = SlideAnimation.slide_img_count - 1;
    }
    else if (img_index == SlideAnimation.slide_img_count - 1) {
        next_img_index = 0;
        next_next_img_index = 1;
    }
    else if (img_index == SlideAnimation.slide_img_count - 2) {
        next_next_img_index = 0;
    }

    if (dir == "left") {
        SlideAnimation.imgSlide(img_index, -1);
        SlideAnimation.imgSlide(next_img_index, 0);
        setTimeout('SlideAnimation.imgSlide(' + next_next_img_index + ',1)', SLIDE_DURATION);
    }


    setTimeout('SlideAnimation.imgDuration(' + img_index + ',0)', SLIDE_DURATION);
}
function imgSlideAnimation() {
    this.imgSlideAction(SlideAnimation.slide_img_cr, "left");
    if (SlideAnimation.slide_img_cr <= SlideAnimation.slide_img_count - 2) {
        SlideAnimation.slide_img_cr++;
    } else {
        //从头开始
        SlideAnimation.slide_img_cr = 0;
    }
}
function startAnimation() {
    setInterval('imgSlideAnimation()', 1000);
}


var slide_touch = {
    pre_x: 0,

    imgMove: function (img_index, move_x) {
        var cr_x_raw = $('.top_slide_wrap >div').eq(img_index).css('transform');
        var cr_x_array = cr_x_raw.split(',');
        var cr_x = parseInt(cr_x_array[4]);


        $('.top_slide_wrap >div').eq(img_index).css('transform', 'translate3d(' + (cr_x + move_x) + 'px,0px,0px)');
    },

    imgMoveAction: function (img_index, move_x) {
        var pre_img_index = img_index - 1;
        var next_img_index = img_index + 1;
        if (img_index == 0) {
            pre_img_index = SlideAnimation.slide_img_count - 1;
        }
        else if (img_index == SlideAnimation.slide_img_count) {
            next_img_index = 0;
        }
        this.imgMove(pre_img_index, move_x);
        this.imgMove(img_index, move_x);
        this.imgMove(next_img_index, move_x);
    }
};

var top_slide = document.getElementById('top_slide_wrap_id');
top_slide.addEventListener('touchstart', function (event) {
    //slide_touch.imgMove(SlideAnimation.slide_img_cr,3);
    //点击滑动区域时记下x坐标
    //slide_touch.pre_x = event.changedTouches[0].clientX;
});
top_slide.addEventListener('touchmove', function (event) {
    //move_x是移动的距离
    //var move_x = event.changedTouches[0].clientX - slide_touch.pre_x;
    // slide_touch.pre_x = event.changedTouches[0].clientX;
    //slide_touch.imgMoveAction(SlideAnimation.slide_img_cr, move_x);
});

function debug(string) {
    $('#test').append(string);
    $('#test').append("<br/>");
}

//dom加载完毕执行
$(function () {
    cssInit();
    //执行切换图动画
    startAnimation();
});

//展开按钮点击事件
$('#j_toggle_nav').click(function () {

    //判断展开按钮状态
    //我不推荐通过赋值class的方法来,可以用数值循环
    if ($('#j_toggle_nav').attr('class') == 'toggle_btn_up') {
        $('#nav_ntjoy_list_id >a').each(function () {
            if ($(this).attr('class') == 'hide') {
                $(this).attr('class', 'zk');
            }
        });
        $('#j_toggle_nav').attr('class', 'toggle_btn_down');
    } else {
        $('#nav_ntjoy_list_id >a').each(function () {
            if ($(this).attr('class') == 'zk') {
                $(this).attr('class', 'hide');
            }
        });
        $('#j_toggle_nav').attr('class', 'toggle_btn_up');
    }

});