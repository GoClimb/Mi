window.onload = function () {
    function getStyle(dom, attr) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(dom, null)[attr];
        } else {
            return dom.currentStyle[attr];
        }
    }

    function animate(dom, target, fn) {
        clearInterval(dom.timer)
        dom.timer = setInterval(function () {
            var flag = true

            for (var attr in target) {

                if (attr == "opacity") {
                    var current = parseInt(getStyle(dom, "opacity") * 100)
                } else {
                    var current = parseInt(getStyle(dom, attr))
                }

                var speed = (target[attr] - current) / 10
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)

                if (attr == "zIndex") {
                    current = target.zIndex;
                } else {
                    current = current + speed
                }

                if (current != target[attr]) {
                    flag = false;
                }

                if (attr == "zIndex") {
                    dom.style.zIndex = current;
                } else if (attr == "opacity") {
                    dom.style.opacity = current / 100;
                    dom.style.filter = "alpha(opacity=" + current + ")";
                } else {
                    dom.style[attr] = current + "px";
                }

            }
            if (flag) {
                clearInterval(dom.timer)
                if (fn) {
                    fn()
                }
            }

        }, 20)

    }
    // ---------------------头部----------------
    var pullrightright = document.querySelector('.pull-right-right')
    var cartBox = document.querySelector('.cartBox')
    pullrightright.onmouseover = function (e) {
        this.style.background = "#fff"
        this.style.color = "orange"
        var event = e || window.event
        event.stopPropagation()
        animate(cartBox, {
            height: 100
        })
    }
    cartBox.onmouseover = function (e) {
        var event = e || window.event
        event.stopPropagation()
    }
    document.onmouseover = function () {

        // pullrightright.style.color = ""
        // animate(pullrightright,{color:0})
        animate(cartBox, {
            height: 0
        }, function () {
            pullrightright.style.background = ""
            pullrightright.style.color = ""
        })

    }


}

$(function () {
    //导航栏上购物车效果
    $('.logo').hover(function () {
        $('.logo').children('.img1').stop().animate({
            left: 54
        }, 150).next().stop().animate({
            left: 5
        }, 150)
    }, function () {
        $('.logo').children('.img1').stop().animate({
            left: 5
        }, 150).next().stop().animate({
            left: -54
        }, 150)
    })

    $.ajax({
        url: '../lib/nav_top.json',
        dataType: 'json',
        success: function (res) {
            let str = ''
            res.forEach((value) => {
                str += `<li>${value.name}</li>`
            })
            $('.nav-content-mid').html(str).children("li").on({
                    mouseenter: () => {
                        $('.nav-box').stop().slideDown()
                    },
                    mouseleave: () => {
                        $('.nav-box').stop().slideUp()
                    }
                }).on('mouseover', function () {
                const index = $(this).index()
                const list = res[index].list
                let str = ''
                list.forEach((value) => {
                    str += `<li>
                            <div><img src="${value.list_url}"></div>
                            <p>${value.list_name}</p>
                            <span>${value.list_price}</span>
                            </li>`
                })
                $('.nav-box > .navBox1').html(str)
            })

            $('.nav-box').on({
                mouseover: function () {
                    $(this).finish().show()
                },
                mouseout: function () {
                    $(this).finish().slideUp()
                }
            })
            
        }
    })
   })