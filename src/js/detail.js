
$(function(){
    var info = JSON.parse(localStorage.getItem('info'))
    if(!info){
        alert('你还没有数据')
        window.location.href="./list.html"
    }
 
    $('.header-content-left').html(`<li>${info.name}</li><span>|</span><li>${info.name2}</li>`)
    $('.header-content-right').html(`<li>${info.head.h1}</li>
    <span>|</span>
    <li>${info.head.h2}</li>
    <span>|</span>
    <li>${info.head.h3}</li>
    <span>|</span>
    <li>${info.head.h4}</li>`)
  
    $('.swiper1 img').attr('src',info.list_url2)
    $('.swiper2 img').attr('src',info.list_url3)
    $('.swiper3 img').attr('src',info.list_url4)
    $('.swiper4 img').attr('src',info.list_url5)
    $('.detail-main-right').html(`<h2>${info.name}</h2>
    <p class="p1">${info.word}</p>
    <p class="p2">小米自营</p>
    <div class="piece">
        <span>${info.state}</span>
        <span>￥${info.list.market_price_max}</span>
    </div>
    <div class="version">选择版本</div>
    <ul class="version-content">
        <li>
            <span>${info.list.value}</span>
            <span>${info.list.market_price_max}</span>
        </li>
        <li>
            <span>${info.list2.value}</span>
            <span>${info.list2.market_price_max}</span>
        </li>
        <li>
            <span>${info.list3.value}</span>
            <span>${info.list3.market_price_max}</span>
        </li>
    </ul>
    <div class="phone-color">选择颜色</div>
    <ul class="phone-color-version">
        <li><img src="${info.list_url2}">${info.color.value}</li>
        <li><img src="${info.list_url6}">${info.color2.value}</li>
    </ul>
    <ul class="pay">
        <li class="pa1">小米10 Pro 12GB+512GB 珍珠白
        </li>
        <li class="sum">总计：5999</li>
    </ul>
    <div class="cart">
        <a class="btn2">立即购买</a>
    <a class="btn1">加入购物车</a>
    </div>`)
    $('.version-content').on('click','li',function(){
        $('.pay').children().first().html(this.innerHTML)
        $('.sum').text('总计：'+$(this).children().last().text())
    })
    
    
    $(window).scroll(()=>{
        if($(window).scrollTop()>=202){
            $('.detail-header1').addClass('active')
        }
        if($(window).scrollTop()<203){
            $('.detail-header1').removeClass('active')
        }
    })

    $('.version-content > li').click(function(){
        $(this).addClass('active').siblings().removeClass('active')
    })
    $('.phone-color-version > li').click(function(){
        $(this).addClass('active2').siblings().removeClass('active2')
    })

//     轮播图
var mySwiper = new Swiper('.swiper-container',{
    effect : 'fade',
    direction: 'horizontal', // 垂直切换选项
    loop: true,
    pagination: {
        el: '.swiper-pagination'
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    })

    $(".example").imagezoomsl({ 
        zoomrange: [1, 12],
        zoomstart: 2,
        innerzoom: true,
        magnifierborder: "none"		 
     });

     $('.btn2').click(function(){
         if(!document.cookie){
             alert('请你登录再进行选购')
         }else{
             window.location.href="./cart.html"
         }
     })
     $('.btn1').click(function(){
         if(!document.cookie){
             alert('请您登录进行选购')
             window.location.href="./login.html"
         }
         let cartList = JSON.parse(localStorage.getItem('cartList')) || []
         let exits = cartList.some((value)=>{
             return value.id==info.id
         })
         if(exits){
            let data = null
             for(let i=0; i < cartList.length;i++){
                 if(cartList[i].id==info.id){
                     data = cartList[i]
                     break
                 }
             }
             data.num++
             data.xiaoji = data.num * data.list.market_price_max

         }else{
             info.num = 1
             info.xiaoji = info.list.market_price_max
             info.isSelect = true
             cartList.push(info)
         }

         localStorage.setItem('cartList',JSON.stringify(cartList))
       

     })
    
        
    
})
