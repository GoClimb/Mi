$(function(){
    $('.logo').hover(function () {
        $('.logo').children('.img1').stop().animate({
            left: 54
        }, 150).next().stop().animate({
            left: 0
        }, 150)
    }, function () {
        $('.logo').children('.img1').stop().animate({
            left: 1
        }, 150).next().stop().animate({
            left: -54
        }, 150)
    })
    $('.cart-main-content').on('click','.icon-checkboxunchecked',function(){
        $(this).toggleClass('checked')
    })
    // $('.icon-checkboxunchecked').click(function(){
    //     
    // })
    // console.log($('.icon-checkboxunchecked').hasClass('checked'))
    let cartList = JSON.parse(localStorage.getItem('cartList'))
    if(!cartList){
        alert('你的购物车还是空的,快去选购吧')
    }else{
        bingHtml()
        bingEvent()
    }

    function bingHtml(){
        let selectAll = cartList.every(item=>{
            return item.isSelect==true
        })

        let str = `
        <div class="cart-main-top">
            <div class="selectAll">
                <i class="iconfont icon-checkboxunchecked check1 ${selectAll ?'checked':''}"><em class="iconfont icon-gougou"></em></i>
                全选
            </div>
                <div class="cart-name">商品名称</div>
                <span>单价</span>
                <span>数量</span>
                <span>小计</span>
                <span>操作</span>
            </div>
            
            
          `
          cartList.forEach(item=>{
              str+=`
              <div class="cart-main-mid">
              <div class="solocheck">
                  <i data-id=${item.id} class="iconfont icon-checkboxunchecked check2 ${item.isSelect?'checked':''}"><em class="iconfont icon-gougou"></em></i>
              </div>
             
              <div class="imgBox">
                  <img src="${item.list_url}" alt="">
              </div>
              <span class="cart-version">${item.name}</span>
              <span class="piece">${item.list.market_price_max}元</span>
              <div class="cart-num">
                 <button class="jian" data-id=${item.id}>-</button><input type="text" value="${item.num}"><button class="jia" data-id=${item.id}>+</button>
              </div>
              <span class="xiaoji">${item.xiaoji}元</span>
              <div class="delBox">
                  <i class="iconfont icon-shanchu" data-id=${item.id}></i>
              </div>
          </div>
              `
          })   
          let selectArr = cartList.filter(item=>item.isSelect==true)  
          
          let cartNum = cartList.length
          let selectNum = 0
          let selectSum = 0
          selectArr.forEach(item=>{
            selectNum += item.num
            selectSum += item.xiaoji
          })
          str+=`  
          <div class="cart-main-bottom">
              <div class="catr-bottom-left">
                  <span>继续购物</span>
                  <span>共<i class="bottom-sum">${cartNum}</i>件商品,已选择<i class="bottom-num">${selectNum}</i>件</span>
              </div>
              <div class="cart-bottom-right">
                  <span>合计:<em class="pay-sum">${selectSum}</em>元</span>
                  <button href="javascript:;" class="pay-money ${selectArr.length?'':'pay-money-none'}">去结算</button>
              </div>
          </div>`
          $('.cart-main-content').html(str)

    }

    function bingEvent(){
        $('.cart-main-content').on('click','.check1',function(){
            cartList.forEach(item=>{
                item.isSelect = $(this).hasClass("checked")
            })
            bingHtml()
            localStorage.setItem('cartList',JSON.stringify(cartList))
        })

        $('.cart-main-content').on('click','.check2',function(){
            console.log(this)
            const id = $(this).data('id')
           
            cartList.forEach(item=>{
                if(item.id==id){
                    item.isSelect = !item.isSelect 
                }
            })
            bingHtml()
            localStorage.setItem('cartList',JSON.stringify(cartList))
        })
        $('.cart-main-content').on('click','.jian',function(){
            let id = $(this).data('id')
            cartList.forEach(item=>{
                if(item.id==id){
                    item.num>1?item.num--:''
                    console.log(item.num)
                    item.xiaoji = item.num * item.list.market_price_max
                }
            })
            bingHtml()

            localStorage.setItem('cartList',JSON.stringify(cartList))
        })

        $('.cart-main-content').on('click','.jia',function(){
            let id = $(this).data('id')
            cartList.forEach(item=>{
                if(item.id == id){
                    item.num++
                    item.xiaoji = item.num * item.list.market_price_max
                }
            })
          
            bingHtml()
            localStorage.setItem('cartList',JSON.stringify(cartList))
        })

        $('.cart-main-content').on('click','.icon-shanchu',function(){
            let id = $(this).data('id')
            // cartList.forEach(item=>{
            //     if(item.id==id){
            //         cartList.removeChild()
            //     }
            // })
            let news =cartList.filter(item=>{
                return item.id!=id
            })
            cartList = news
            bingHtml()
            localStorage.setItem('cartList',JSON.stringify(news))
        })
    }
   
})
