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

    //导航栏   

    var mySwiper1 = new Swiper('.swiper1', {
        direction: 'horizontal', // 垂直切换选项
        loop: true, // 循环模式选项
        autoplay: {
            delat: 2000
        },
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            bulletActiveClass: 'my-bullet-active'
        },

        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        // fadeEffect: {
        //     crossFade: true,
        //   }

        // 如果需要滚动条
        // scrollbar: {
        //   el: '.swiper-scrollbar',
        // },
    })

    var mySwiper2 = new Swiper('.swiper2',{
         slidesPerView : 'auto',
         slidesPerGroup : 4,
         observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true,//修改swiper的父元素时，自动初始化swiper
         autoplay: {
            delat: 2000
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
      })

      $.ajax({
        url:'../lib/time.json',
        dataType:'json',
        success:function(res){
            let str = ""
            res.forEach((value)=>{
                str +=` <div class="swiper-slide">
                <div><img src="${value.list_url}" alt="">
                </div>
                <p>${value.id}</p>
                <p>${value.name}</p>
                <p>${value.list_price}<s>688</s></p>
                </div>`
            })
            $('.swiper2 >.swiper-wrapper').html(str)
            
        }
        
    })

     function getNowTime(){
        var date = new Date();
        //  获取秒
        var second = date.getSeconds();
        second = second<10?"0"+second:second;

        return second
     }
     function getHours(){
        var date = new Date();
        //获取小时
        var hour = date.getHours()
        hour = hour<10?"0"+hour:hour
        return hour
     }
     function getMin(){
        var date = new Date();
        var minute = date.getMinutes();
        minute = minute<10?"0"+minute:minute;
        return minute
     }


     function show(){
        $('.min').html(getMin())
        $('.hours').html(getHours())
        $('.second').html(getNowTime()) 
     }
     show()
     var clock = setInterval(show,1000);
     

}
//=============jquery==============
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
            res.forEach(value => {
                str += `<li>${value.name}</li>`
            })
            $('.nav-content-mid').html(str).children('li').on({
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
            // $('.nav-content-mid').children('li').on({
            //     mouseover:function(){
            //         const index = $(this).index()
            //         const list = res[index].list
            //         let str = ''
            //         list.forEach((value) => {
            //             str += `<li>
            //             <div><img src="${value.list_url}"></div>
            //                  <p>${value.list_name}</p>
            //                  <span>${value.list_piece}</span>
            //                  </li>`
            //         })
            //         $('.navBox1').html(str)
            //     },mouseenter:function(){
            //         $('.navBox1').stop().slideDown()
            //     },mouseleave:()=>{
            //         $('.navBox1').stop().slideUp()
            //     }   
            // })
         
        }
    })

    $.ajax({
        url: '../lib/indexPhone.json',
        dataType: 'json',
        success: function (res) {
            bingPhone(res)
           
        }
    })
   
    function bingPhone(res){
    let newsPhone = res.slice(0,1)

    let newsPhone2 = newsPhone[0].list
    console.log(newsPhone2)
    let str =''
    newsPhone2.forEach(item=>{
        str+=`<div>
        <img src="${item.list_url2}" alt="">
        <p>${item.list_name}</p>
        <p>${item.list_name}</p>
        <p>${item.list_price}</p>
        </div>
        `
    })
    $('.phone-bottom-right').html(str)
    }

    $.ajax({
        url: '../lib/main.json',
        dataType: 'json',
        success: function (res) {
            let str = ''
            res.forEach((value) => {
                str += ` <li>${value.name}<em class="iconfont icon-arrow-right-copy-copy-copy"></em></li>`
            })
            $('.list>ul').html(str)
            $('.list>ul').children('li').on({
                mouseover: function () {
                    const index1 = $(this).index()
                    const list1 = res[index1].list
                    let str1 = ""
                    list1.forEach((value) => {
                        str1 += `<li>
                    <img src="${value.list_url}" alt="">
                    <span>${value.list_name}</span>
                </li>`
                    })
                    $('.list-right').show()
                    $('.list-right>ul').html(str1)
                },
                mouseout: function () {
                        $('.list-right').hide()

                }
            })

        }
    })
   
   

})