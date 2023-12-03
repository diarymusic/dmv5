$(function () {
    scrControl(1);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    $('.loading').addClass('hidden');
    var ind = 0;
    var i = setInterval(function () {
        var shows = document.getElementsByClassName("shows");
        show(shows[ind]);
        // $(shows[ind]).addClass('showed');
        $(shows[ind]).removeClass('shows');
        ind + 1;

        if (ind == shows.length) {
            clearInterval(i);
            ind = 0;
        }
    }, 500);

    function show(cl, sh) {
        if (sh !== 1) {
            $(cl).addClass('showed');
            $(cl).removeClass('lishows');
        } else {
            $(cl).removeClass('showed');
            $(cl).addClass('lishows');
        }
    }
    $(document).on('scroll', function () {
        $('.h').addClass('hid');
        var h = $(window).scrollTop();
        var maxh = $(document).height();
        var currh = $(window).height();
        var num = Math.ceil((h - 100) / 160);
        var str = ".s" + num;
        // $(str).addClass('lishows');
        if (h > 100 && h < (maxh - currh - 1)) {
            // $(str).addClass('showed');
            show(str);
        } else if (h >= (maxh - currh - 1)) {
            // $('.lishows').addClass('showed');
            show('.lishows');
        } else {
            // $('.h').removeClass('hid')
            $('.lishows').removeClass('showed');
            show('.lishow', 1);
        }
    });

    function scrControl(t) {
        if (t == 0) { //禁止滚动
            document.body.style = "overflow:hidden";
            document.body.addEventListener('touchmove', this.bodyScroll, { passive: false });
        } else if (t == 1) { //开启滚动
            document.body.style = "";
            document.body.removeEventListener('touchmove', this.bodyScroll, { passive: false });
            window.onmousewheel = function () {
                return true;
            };
        }
    }
    var scroll_width = 100;  // 设置每次滚动的长度，单位 px
    var scroll_events = "mousewheel DOMMouseScroll MozMousePixelScroll";  // 鼠标滚轮滚动事件名
    $('.glry').mouseenter(function () {
        scrControl(0);
        $('.glry').on(scroll_events, function (e) {
            var delta = e.originalEvent.wheelDelta;  // 鼠标滚轮滚动度数
            // 滑轮向上滚动，滚动条向左移动，scrollleft-
            if (delta > 0) {
                var count = 0;
                var inv = setInterval(() => {
                    $(".glry").scrollLeft($(".glry").scrollLeft() - 1);
                    if (count == scroll_width) {
                        clearInterval(inv)
                    }
                    count++
                }, 0.1);

                // 这里的两个html是指包含横向滚动条的那一层

            }
            // 滑轮向下滚动，滚动条向右移动，scrollleft+
            else {
                var count = 0;
                var inv = setInterval(() => {
                    $(".glry").scrollLeft($(".glry").scrollLeft() + 1);
                    if (count == scroll_width) {
                        clearInterval(inv)
                    }
                    count++
                }, 0.1);

            }
        });
    });
    $('.glry').mouseleave(function () {
        scrControl(1);
    });
    $("body").on("shown.bs.modal", () => {
        scrControl(1)
    })
    $("body").on("hidden.bs.modal", () => {
        scrControl(1)
    })
});