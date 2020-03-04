window.onload = function () {

}

$(function () {
    var validator = $('.login-user').validate({
        rules: {
            username: {
                required: true
            },
            password: {
                required: true
            }

        },

        showErrors: function (errorMap, errorList) {
            if (errorList.length != 0) {
                $(".err-con").empty().text(errorList[0].message);
            }
        },
        messages: {
            username: {
                required: "请输入用户名"
            },
            password: {
                required: "请输入密码"
            }

        },
        onfocusout: false,
        errorPlacement: function (error, element) {
            error.appendTo($('.err-con'))
        },
        submitHandler:function(form){
        //    $.post('/login',$(form).serialize(),res=>{
        //        console.log(res)
        //    })
        $.ajax({
            url:'/login',
            type:'post',
            data:$(form).serialize(),
            success:function(res){
               if(res=="1"){
                   window.location="http://localhost:8080/pages/index.html"
               }else{
                   $('.err-con').html('用户名密码错误')
                   $(".btn").click(function() {
                    validator.resetForm()
                })
                
               }
            },
            error:function(res){
                console.log(res)
            }
        })
        }

    })
   


    $('.codeLogin').click(function () {
        $('.login-user').hide()
        $('.code').show()

    })
    $('.acountLogin').click(function () {
        $('.code').hide()
        $('.login-user').show()

    })
  



})