$(function(){
    var flag = true
    $('.list-nav-header').click(function(){
        
        if(flag){
            $('.list-nav-header > h2 > i').removeClass("icon-xiajiantou").addClass('icon-shangjiantou').parents('.list-nav-header').siblings().fadeOut()
           
            flag = false
        }else{
            $('.list-nav-header > h2 > i').removeClass("icon-shangjiantou").addClass('icon-xiajiantou').parents('.list-nav-header').siblings().fadeIn()
            flag = true
        }
    })

    var list = []

   $.ajax({
       url:'../lib/list.json',
       dataType:'json',
       success:function(res){

           $('.m-style').pagination({
            pageCount: Math.ceil(res.length/12),
            current:1,
            jump: true,
            coping: true,
            homePage: '首页',
            endPage: '末页',
            prevContent: '上页',
            nextContent: '下页',
            callback: function (api) {
                let page = api.getCurrent()
                htmlXr(res.slice((page-1)*12,(page*12)))
                // console.log(api.getCurrent())
            }

        });
        list = res
        htmlXr(res.slice(0,12))
       }
   })

   function htmlXr(list){
       var str = ''
       list.forEach((value)=>{
           str+=`<li data-index="${value.id}">
                 <img src="${value.list_url}" alt="">
                 <p>${value.name}</p>
                 </li>`
       })
       $('.list-nav-main').html(str)
   }
   $('.list-nav-main').on('click','li',function(){

       $.ajax({
           url:'/detail',
           dataType:'json',
           success:function(res){
               console.log(res)
           },
           error:function(res){
               console.log(res)
           }
       })
       var data = []
       const id = $(this).data('index')
       for(var i=0;i<list.length;i++){
           if(id==list[i].id){
               data = list[i]
               break
           }
       }
       localStorage.setItem('info',JSON.stringify(data))
       window.location.href='./detail.html'
       
   })
  
})