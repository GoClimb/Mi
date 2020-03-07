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
            dataType:'json',
            data:$(form).serialize(),
            success:function(res){
                if(res.message=="1"){
                    document.cookie = 'username='+res.username
                    window.location.href="./index.html"
                }else{
                    $('.err-con').html('用户名密码错误')
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